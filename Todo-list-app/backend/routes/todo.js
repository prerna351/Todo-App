const express = require("express");
const router = express.Router();

const {User, Todo} = require("../db");
const { authMiddleware } = require("../middleware");



//retrieve all todos

router.get("/mytodo",authMiddleware, async(req, res) => {
    try {
        const todos = await User.findById(req.user._id).populate('todos');
        res.status(200).json(todos.todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})





//create todo------------------------------------------------------------------------------------------
router.post("/createTodo",authMiddleware, async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    
    
        const newTodo = await Todo.create({
            title,
            description,
            completed: false
        })
        const todoId = newTodo._id;
    

    try{
        await User.updateOne({ _id: req.user._id },{
            "$push":{
                todos: todoId
            }
        })
       } catch(error){
        console.log(error)
       }
    res.json({
        message: 'Your Todo is created'
     })
})


module.exports = router;




//update route------------------------------------------

router.put("/updateTodo",authMiddleware, async(req, res) => {
    const completed = req.body.completed;
    const todoId = req.body.todoId;
    // const user = await User.findById(req.user._id)
    // const todo = user.

    await Todo.updateOne({
        // Frontend State Management: Maintain the state of todos in your frontend application, such as in a JavaScript array or using a frontend state management library like Redux or React Context API. When a user interacts with a todo (e.g., clicks a checkbox), you can access the todo ID from the frontend state.
        _id: todoId
    },{
        // in the frontend, on click write code: if completed = false make it true and if true make it false
        completed
    })

    res.status(200).json({ message: 'Todo updated successfully' });
})





//delete route----------------------------------------------------------------------------

router.delete("/deleteTodo",authMiddleware, async(req, res) => {

    await Todo.deleteOne({
        _id: req.body.todoId
    })

    res.status(200).json({ message: 'Todo deleted successfully' });
})

module.exports = router;