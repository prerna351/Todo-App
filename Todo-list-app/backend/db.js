const mongoose = require("mongoose")
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
mongoose.connect(process.env.MONGO_URI);
const {Schema} = mongoose;



// define schema for user credentials
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
})

// define schema for todos
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 20

    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

//export the models
module.exports = {
    User,
    Todo
}