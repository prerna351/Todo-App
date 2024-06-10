const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { User } = require("./db");

async function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: "Invalid token"
        });
    }
    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decode.id });
        
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch(error){
        return res.status(403).json({msg: "hello"});
    }
}

module.exports = {
    authMiddleware
};