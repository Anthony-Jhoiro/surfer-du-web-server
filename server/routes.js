const AuthentificationController = require("./controllers/AuthentificationController");
const AuthenticationMiddleware = require("./middlewares/AuthenticationMiddleware");

exports.loadRoutes = app => {
    app.use("/api", AuthenticationMiddleware);
    // Authentification
    // Registration
    app.post('/api/auth/register', AuthentificationController.register);

    // Login
    // Logout

    // Password recovery

    // Spot creation
    // Spot update
    // Get all spots
    // Get specific spots
}