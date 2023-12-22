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
    image: {
        data: Buffer,
        contentType: String
    }
});

const JumboPokerClothes = model("Jumbo Poker Clothes Model", JumboMaterialModel);

module.exports = JumboPokerClothes;