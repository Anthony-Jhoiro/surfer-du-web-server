const AuthentificationController = require("./controllers/AuthentificationController");
const SpotController = require("./controllers/SpotController");
const AuthenticationMiddleware = require("./middlewares/AuthenticationMiddleware");

exports.loadRoutes = app => {
    app.use("/api", AuthenticationMiddleware);
    // Authentification
    // Registration
    app.post('/api/auth/register', AuthentificationController.register);

    // Login
    app.post('/api/auth/login', AuthentificationController.login);
    

    // Password recovery

    // Spot creation
    app.post('/api/spot', SpotController.createSpot);
    // Spot update
    app.put('/api/spot/spotId', SpotController.updateSpot);

    // Get all spots
    app.get('/api/spot', SpotController.getSpots);
    // Get specific spots
}