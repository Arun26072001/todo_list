const mongoose = require("mongoose");

function connectDatabase(){
    try {
        const connectionURL = process.env.DB_CONNECTION_URL;
        const connect = mongoose.connect(connectionURL);
        console.log("database connected successfully")
    } catch (error) {
        console.log("error in connect database", error)
    }
}

module.exports = {connectDatabase}