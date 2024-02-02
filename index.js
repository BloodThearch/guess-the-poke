const express = require("express")
const cookieParser = require('cookie-parser')

const {connectMongoDb} = require("./connection")

const {restrictToLoggedInUserOnly, restrictToRole} = require("./middlewares/auth")

const userRouter = require("./routes/user")
const pokeRouter = require("./routes/poke")

function createApp() {
    const app = express()
    const PORT = process.env.PORT || 8000

    // CONNECTION
    connectMongoDb("mongodb://127.0.0.1:27017/guess-the-poke")

    // MIDDLEWARE
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.json())

    // ROUTES
    app.use("/user", userRouter)
    app.use("/poke", restrictToLoggedInUserOnly,(req, res, next) =>{ return restrictToRole(["NORMAL"],req,res,next)} , pokeRouter)


    app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`))
}

module.exports = {
    createApp
}