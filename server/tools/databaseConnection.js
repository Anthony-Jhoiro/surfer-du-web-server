const mongoose = require("mongoose");
const {MONGODB_URI} = require("./environnement");

mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        console.log("Successfully connect to database.");
    })

exports.db = mongoose.connection;