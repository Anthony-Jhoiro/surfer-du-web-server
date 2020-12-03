// Importation des différentes dépendences

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./server/tools/databaseConnection');

const { PORT } = require('./server/tools/environnement');
const { FRONT_URL } = require('./server/tools/environnement');
const { loadRoutes } = require("./server/routes");

const app = express();

app.use(bodyParser.json());

const corsOptions = cors.CorsOptions = {
  origin: FRONT_URL,
  optionsSuccessStatus: 200,
  exposedHeaders: 'x-access-token' // Token d'authentification
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

loadRoutes(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})