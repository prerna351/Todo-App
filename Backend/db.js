

const mongoose = require("mongoose")
mongoose.connect("");
const {Schema} = mongoose;

// define schema for user credentials
const signUpSchema = new Schema({
    name: String,
    email: String,
    password: String
})
//create model
const signup = mongoose.model("signup",signUpSchema)


// define schema for todos
const todoSchema = new Schema({
    title: String,
    discription: String,
    completed: Boolean 
})
//create model
const todo = mongoose.model("todo",todoSchema)


//export the models
module.exports = {
    signup,
    todo
}
