const express = require("express")
const {register, login} = require("../controllers/user")

// Init router
const router = express.Router()

// ROUTING

// routing for register page
router.route("/register").post(register)

// routing for login page
router.route("/login").post(login)


module.exports = router