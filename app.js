// Importation des différentes dépendences

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const environnement = require('./server/tools/environnement');

const PORT = environnement.PORT;
const FRONT_URL = environnement.FRONT_URL;

const app = express();

app.use(bodyParser.json());

const corsOptions = cors.CorsOptions = {
    origin: FRONT_URL,
    optionsSuccessStatus: 200,
    exposedHeaders: '_token'
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({error: "Une erreur est survenue sur le serveur", stack: err.stack});
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})

exports.app = app;