const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AceMaterialModel = new Schema({
    name: String,
    brand: String,
    price: Number,
    audience: String,
    date: {
        type: Date,
        default: Date.now
    },
    image: String
}, {versionKey: false});

const AcePokerClothes = model("Ace Poker Clothes Model", AceMaterialModel, "Ace Poker Clothes");

module.exports = AcePokerClothes;