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

    async getSpots(req, res) {
        let {searchItem, limit, offset } = req.query;

        if (!searchItem) searchItem = "";
        if (!limit) limit = 10;
        if (!offset) offset = 0;

        
        const searchRegex = new RegExp(searchItem);
        //search by country
        const spots = await Promise.all([
            Spot.find({"address.country": {$regex: searchRegex, $options: 'i'}}).sort({updated: -1}).skip(limit * offset).limit(limit)
            .populate('mainAuthor', 'username'),
            Spot.find({"address.city": {$regex: searchRegex, $options: 'i'}}).sort({updated: -1}).skip(limit * offset).limit(limit)
            .populate('mainAuthor', 'username'),
            Spot.find({"name": {$regex: searchRegex, $options: 'i'}}).sort({updated: -1}).skip(limit * offset).limit(limit)
            .populate('mainAuthor', 'username')
        ]);
        const rep = []

        spots.forEach(ps => {
            ps.forEach(p => {
                const index = rep.findIndex(m => m.spot._id === p._id)
                if (index === -1) {
                    rep.push({count: 1, spot : p});
                } else {
                    rep[index].count ++;
                }
            });
        });

        return res.json({
            spots: rep.sort((a, b) => a.count < b.count ? -1 : 1).map(r => r.spot)
        });
    }
}

const SpotController = new _SpotController();

module.exports = SpotController;