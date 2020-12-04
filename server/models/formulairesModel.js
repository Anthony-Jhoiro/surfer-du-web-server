const {Schema, model, Document} = require("mongoose");

const formulaireSchema= new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sessionDate: {type: Date, default: Date.now},
    sessionPlace: {
        type: Schema.Types.ObjectId,
        ref: 'Spot'
    },
    timeBeginingSession: Number,
    timeEndSession: Number,
    durationOfSession: Number,
    numberOfSwimmers: Number,
    fishingBoats: {type: Boolean, default: false},
    pleasureBoats: {type: Boolean, default: false},
    sailBoats: {type: Boolean, default: false},
    sessionRating: Number
})

module.exports = model('Formulaire', formulaireSchema, 'formulaires');