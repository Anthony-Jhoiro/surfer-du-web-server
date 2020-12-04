const Formulaire = require("../models/formulairesModel");

class _FormulaireController {
    async createFormulaire(req, res) {
        // Check authentication
        if (!req.currentUserId) return res.status(401).send("UNAUTHORIZE");

        // Parse arguments
        const {sessionDate, sessionPlace, timeBeginingSession, timeEndSession, numberOfSwimmers, fishingBoats, pleasureBoats, sailBoats, sessionRating} = req.body;
        console.log({sessionDate, sessionPlace, timeBeginingSession, timeEndSession, sessionRating})
        if(!(sessionDate && sessionPlace && timeBeginingSession && timeEndSession && sessionRating))
            return res.status(400).send("BAD_REQUEST");

        var duration = timeEndSession - timeBeginingSession ;

        // Form creation
        const formulaire = await Formulaire.create({
            author: req.currentUserId,
            sessionDate,
            sessionPlace,
            timeBeginingSession,
            timeEndSession,
            durationOfSession: duration,
            numberOfSwimmers: numberOfSwimmers,
            fishingBoats: fishingBoats,
            pleasureBoats: pleasureBoats,
            sailBoats: sailBoats,
            sessionRating
        });

        return res.json({forumaire: formulaire});
    }
}

const FormulaireController = new _FormulaireController();

module.exports = FormulaireController;