const jwt = require("jsonwebtoken")
// const sessionIdToUserMap = new Map()

const SECRETKEY = "admin123"

function setUser(user) {
    return jwt.sign({
        ...user
    }, SECRETKEY)
}

function getUser(token) {
    if (!token) return null
    try{
        return jwt.verify(token, SECRETKEY)
    } catch (error) {
        return null
    }
    
}

module.exports = {
    setUser,
    getUser
}