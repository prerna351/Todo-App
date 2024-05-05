const express = require("express");
const app = express();
app.use(express.json());
const User = require('./db/signup');
const {signUp,signIn, newTodo, updateTodo} = require("./validation");
const jwt = require("jsonwebtoken")
const JWT_Secret = "secret-key"



//-------------------------------------------------------------------------------------------------------------

app.post("/signUp", validateInput(signUp), async function(req,res){

    // Error Handling: When working with asynchronous operations like database queries (findOne, save), errors can occur due to various reasons such as network issues, database errors, validation failures, etc. 
    try{
        const {username, email, password} = req.validatedBody;

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({error:"User already exists"})

        //save the user to the database
        await User.save();
    } catch(error){
        console.error('Error while signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
})


//------------------------------------------------------------------------------------------------------------



app.post("/signIn",validateInput(signIn), async function(req,res){
  try{
    const {email, password} = req.validatedBody;
     //find the user in database
     const user = await User.findOne({email});
      if(!user){
        return res.status(401).json({error: "Invalid email or password"});
      }
     //generate jwt toke
      const token = jwt.sign({
       userId: user._id,
       email: email,
       password: password
       }, JWT_Secret);
      res.status(200).json({token});

  } catch(error){
     console.error("Error while signing in:", error);
     res.status(500).json({ error: "Internal server error" });
  }
    
})



//---------------------protected route--------------------------------------------
//create todo
app.post("/newTodo",validateInput(newTodo), authenticateToken, async function(req,res){
  const parsedPayLoad = req.validatedBody;
  if(!parsedPayLoad.success){
    res.status(400).json({msg: "Wrong Inputs"})
    return;
  }

  //put data in mongoDb
  await newTodo.create({
    title: parsedPayLoad.title,
    description: createPayLoad.discription,
    completed: false
  })

     res.json({
       msg: 'Todo created'
    })
})



//------------------------------------------------------------------------------------------------------------

//retrieve todos
app.get("/myTodos",authenticateToken, async function(req,res){

    const todos = await myTodo.find(); 
    res.json({
        todos
    })
})



//------------------------------------------------------------------------------------------------------------

app.put("/updateTodos",authenticateToken , async function(req,res){
    //as the user clicks mark as done
    //this route will take the input
    //id: completed-true

    const updatePayLoad = req.body;
    const parsedPayLoad = updateTodo.safeParse(updatePayLoad); //calling zod schema function
    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
     //update function takes two arguments-- current conditions and updation
    await myTodo.update({
        //_id-- why underscore?---in mongodb database all the data gets an id as _id(automatically generated), so i am telling the update funciton to update this particular todo to complete: true
        _id: req.body.id
    },{
        completed: true
    })

    res.json({
        msg: "Todo completed"
    })
})



//------------------------------------------------------------------------------------------------------------

// delete completed todos
app.delete("/removeTodo",authenticateToken, async function(req,res){
  try {
    const todoId = req.params.id;

    // Find the todo by ID and delete it
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      // If no todo was found with the given ID, send a 404 Not Found response
      return res.status(404).json({ error: "Todo not found" });
    }

    // If the todo was successfully deleted, send a 200 OK response
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    // If an error occurred, send a 500 Internal Server Error response
    res.status(500).json({ error: "Internal server error" });
  }
})




//------------------------------------------------------------------------------------------------------------
//add functionality to display all the completed tasks


app.listen(3000);