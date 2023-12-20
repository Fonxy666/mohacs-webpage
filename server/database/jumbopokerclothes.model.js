const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ImageSchema = new Schema({
  data: Buffer,
  contentType: String
});

const JumboMaterialModel = new Schema({
  name: String,
  brand: String,
  price: Number,
  audience: String,
  image: ImageSchema
});

const AcePokerClothes = model("Ace Poker Clothes Model", JumboMaterialModel)

module.exports = AcePokerClothes;