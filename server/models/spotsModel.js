const {Schema, model, Document} = require("mongoose");

const spotSchema = new Schema ({
    name: String,
    address: {
        type: {
            city: String,
            country: String,
            lat: Number,
            lng: Number
        }
    },
    tide: String, // TODO : change type
    activities: [String],
    lastModifier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = model('Spot', spotSchema, 'spots'); 