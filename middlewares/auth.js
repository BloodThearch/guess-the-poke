const {getUser} = require("../services/auth")

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid

    if (!userUid) {
        return res.json({
            msg: "Not logged in.",
            error: "Login first, before using that service"
        })
    }

    const user = getUser(userUid)
    if (!user) {
        return res.json({
            msg: "Not logged in.",
            error: "Invalid session ID."
        })
    }

    req.user = user;
    next()
}

module.exports = {
    restrictToLoggedInUserOnly
}