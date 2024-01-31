const mongoose = require("mongoose")

async function connectMongoDb(url) {
    return mongoose.connect(url).then(() => console.log("MongoDB connected")).catch((error) => console.log("error", error))
}

module.exports = {
    connectMongoDb,
}