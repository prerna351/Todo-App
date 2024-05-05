//middleware to validate input
function validateInput(schema) {
    return (req, res, next) => {
      try {
        req.validatedBody = schema.parse(req.body);
        // used to pass control to the next middleware function in the middleware chain.
        next();
      } catch (error) {
        res.status(411).json({ msg: "Wrong Input" });
      }
    };
  }

  //  if the validation fails in the middleware function, the control will not proceed to the route handler defined with app.post. Instead, an error response will be sent back to the client from within the middleware function itself.
  

//middleware to authenticate token

function authenticateToken (req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, JWT_Secret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Unauthorized: Invalid token' });
      }
      req.user = user; // Attach user information to request object
      next(); // Move to next middleware
    });
}