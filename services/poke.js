const jwt = require("jsonwebtoken")

const SECRETKEY = "poke123"

function createGameToken(game) {
    return jwt.sign({
        ...game
    }, SECRETKEY)
}

function getGame(token) {
    if (!token) return null
    try{
        return jwt.verify(token, SECRETKEY)
    } catch (error) {
        return null
    }
}

module.exports = {
    createGameToken,
    getGame
}