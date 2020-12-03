const AuthentificationController = require("./controllers/AuthentificationController")

exports.loadRoutes = app => {
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