const axios = require("axios")
const {createGameToken, getGame} = require("../services/poke")

const BASEURL = "https://pokeapi.co/api/v2"
const POKEURL = "/pokemon"

// Range of pokemone id: 1-300
const STARTID = 1
const ENDID = 300

function rng(start, end) {
    return Math.floor(Math.random() * end) + start
}

async function generateGame(req, res) {
    const pokeId = rng(STARTID, ENDID)
    const pokemonDetails = await axios.get(BASEURL+POKEURL+"/"+pokeId).catch( (error) => {
        return res.status(503).json({
            msg: "Failed to fetch pokemon details.",
            "error": error
        })
    })
    // console.log(pokemonDetails.data)
    const pokeName = pokemonDetails.data["species"]["name"]
    const pokeImgUrl = pokemonDetails.data["sprites"]["front_default"]

    const game = {
        pokeId,
        pokeName,
        pokeImgUrl
    }

    // Set game token
    const gameToken = createGameToken(game)
    res.cookie("gameToken", gameToken)

    console.log(`${pokeName} - ${pokeImgUrl}`)

    return res.json({
        msg: "Game generated!",
        pokeImgUrl
    })
}

async function verifyGame(req, res) {
    const body = req.body
    const pokeName = body.pokeName

    if (!pokeName) {
        return res.json({
            msg: "No pokemon name provided.",
            error: "Provide a pokename name."
        })
    }

    const gameToken = req.cookies?.gameToken

    if (!gameToken) {
        return res.json({
            msg: "No game generated yet.",
            error: "Generate game first."
        })
    }

    const game = getGame(gameToken)

    if (!game) {
        return res.json({
            msg: "Invalid game.",
            error: "Invalid game token."
        })
    }

    if (game.pokeName.toLowerCase() != pokeName.toLowerCase()) {
        return res.json({
            msg: "Wrong guess. Try again."
        })
    }
    return res.json({
        msg: "Correct guess!"
    })
}

module.exports = {
    verifyGame,
    generateGame
}