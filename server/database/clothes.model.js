const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MaterialModel = new Schema({
  name: String,
  brand: String,
  price: Number,
  audience: String,
  image: {
    type: Buffer,  // Use Buffer to store binary image data
    contentType: String  // Specify the content type of the image (e.g., 'image/jpeg', 'image/png')
  }
});

const ClothModel = model("Cloth Model", MaterialModel)

module.exports = ClothModel;