const Spot = require("../models/spotsModel");


class _SpotController {
    async createSpot(req, res) {
        // Check authentication
        if (!req.currentUserId) return res.status(401).send("UNAUTHORIZE");

        // Parse arguments
        const {name, address, activities, tide} = req.body;

        console.log({name, address, activities, tide})

        if (!(name && address && address.city && address.country && activities))
            return res.status(400).send("BAD_REQUEST");

        const spot = await Spot.create({
            name,
            address,
            activities,
            tide: tide || null,
            lastModifier: req.currentUserId
        });

        return res.json({spot: spot});
    }
}

const SpotController = new _SpotController();

module.exports = SpotController;