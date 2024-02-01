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

async function restrictToRole(roles = [], req, res, next) {
    if (!roles.includes(req.user._doc.role)) {
        return res.json({
            msg: "Can't use service.",
            error: "Don't have permission."
        })
    }
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    restrictToRole
}