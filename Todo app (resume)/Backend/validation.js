//validate user inputs

//import zod library
const zod = require("zod");

//define schema for validation
//signUp
const signUp = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
}) 

//signIn
const signIn = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
}) 

//create todo
const newTodo = zod.object({
    title: zod.string(),
    discription: zod.string()
}) 

const updateTodo = zod.object({
    id: zod.string()
})

// how to export these variables
module.exports = {
    signUp: signUp,
    signIn: signIn,
    newTodo: newTodo,
    updateTodo: updateTodo
}