const AuthentificationController = require("./controllers/AuthentificationController")

exports.loadRoutes = app => {
    // Authentification
    // Registration
    app.post('/api/auth/register', AuthentificationController.register);

    // Login
    app.post('/api/auth/login', AuthentificationController.login);
    
    // Logout

    // Password recovery

    // Spot creation
    // Spot update
    // Get all spots
    // Get specific spots
}