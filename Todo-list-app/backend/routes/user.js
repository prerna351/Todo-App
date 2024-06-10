const express = require("express");
const router = express.Router();

const {User} = require("../db");
const jwt = require("jsonwebtoken");
const  { JWT_SECRET } = require("../config");
const zod = require("zod");

const signupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})


router.post("/signup", async (req,res) => {

    const {success} = signupSchema.safeParse(req.body);
    if(!success)
        return res.status(411).json({
            message: "Incorrect Inputs"
    })

    //check if user already exists or not
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken. Either sign in or create another account"
        })
    }

    await User.create({
        username: req.body.username,
        email : req.body.email,
        password: req.body.password
    })
    res.json({
        message: "User created successfully",
        
    })
})


//------------------------------------------------------------------------

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})


router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

     //check if user already exists or not
     const existingUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    
    if (existingUser) {
        
        const token = jwt.sign({id: existingUser._id},JWT_SECRET);

        res.json({
            token: "Bearer " + token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

module.exports = router;