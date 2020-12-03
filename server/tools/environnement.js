require("dotenv").config;

const PORT = process.env.PORT || 3000;
const FRONT_URL = process.env.FRONT_URL;

exports.PORT = PORT;
exports.FRONT_URL = FRONT_URL;