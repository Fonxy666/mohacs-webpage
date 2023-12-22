const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ImageSchema = new Schema({
    data: Buffer,
    contentType: String
});

const AceMaterialModel = new Schema({
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

const AcePokerClothes = model("Ace Poker Clothes Model", AceMaterialModel);

module.exports = AcePokerClothes;