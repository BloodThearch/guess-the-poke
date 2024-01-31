const express = require("express")

const {generateGame, verifyGame} = require("../controllers/poke")

// Init Router
const pokeRouter = express.Router()

// ROUTING

// test route
pokeRouter.get("/test", (req, res) => {
    return res.status(200).json({
        msg: "Connection Successful."
    })
})

pokeRouter.route("/game").get(generateGame).post(verifyGame)


module.exports = pokeRouter