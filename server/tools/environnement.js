require("dotenv").config;

const PORT = process.env.PORT || 3000;
const FRONT_URL = process.env.FRONT_URL;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/surferduweb"

exports.MONGODB_URI = MONGODB_URI;
exports.PORT = PORT;
exports.FRONT_URL = FRONT_URL;