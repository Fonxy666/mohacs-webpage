const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const JumboMaterialModel = new Schema({
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

const JumboPokerClothes = model("Jumbo Poker Clothes Model", JumboMaterialModel, "Jumbo Poker Clothes");

module.exports = JumboPokerClothes;