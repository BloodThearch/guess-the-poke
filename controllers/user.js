const { v4: uuidv4 } = require('uuid');

const {setUser} = require("../services/auth")
const User = require("../models/user")

async function register(req, res) {
    const {
        firstName, 
        lastName,
        userName,
        email,
        password
    } = req.body

    await User.create({
        firstName,
        lastName,
        userName,
        email,
        password
    }).catch((error)=>{
        // use status 409 if an information already exist
        res.status(400).json({msg: "Account registration failed.", 'error': error})
    })

    return res.status(201).json({msg: "Account registered!"})
}

async function login(req, res) {
    const {
        userName,
        password
    } = req.body

    const user = await User.findOne({ userName, password})

    if (!user){
        return res.status(401).json({
            msg: "Login failed.",
            error: "Invalid username or password."
        })
    }

    // Generate token for user
    const token = setUser(user)
    res.cookie("uid", token)

    // Creating cookie
    // res.cookie("uid", sessionId)

    return res.status(200).json({
        msg: "Login successful!"
    })
}

module.exports = {
    register,
    login
}