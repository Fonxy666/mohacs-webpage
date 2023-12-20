const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const NewModel = new Schema({
  title: String,
  date: Date.now,
  message: String
});

const News = model("News Model", NewModel)

module.exports = News;