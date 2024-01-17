const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const NewModel = new Schema({
    title: String,
    date: {
        type: Date,
        default: Date.now
    },
    message: String,
    image: String
}, {versionKey: false});

const News = model("News Model", NewModel, "News");

module.exports = News;