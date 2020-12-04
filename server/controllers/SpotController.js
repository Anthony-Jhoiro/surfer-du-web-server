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

    async updateSpot(req, res) {
        // Check authentication
        if (!req.currentUserId) return res.status(401).send("UNAUTHORIZE");
        
        // Parse arguments
        const {name, address, activities, tide} = req.body;
        const {spotId} = req.params;

        console.log({name, address, activities, tide})

        if (!(name && address && address.city && address.country && activities))
            return res.status(400).send("BAD_REQUEST");


        // get previous data
        const spot = await Spot.findOne({_id: spotId});

        spot.name = name;
        spot.address = address;
        spot.activities = activities;
        if (tide) spot.tide = tide;

        spot.lastModifier = req.currentUserId;
        spot.updated_at = Date.now();

        const savedSpot = await spot.save();

        return res.json({spot: savedSpot});
    }
}

const SpotController = new _SpotController();

module.exports = SpotController;