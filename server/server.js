require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const AcePokerClothes = require("./database/acepokerclothes.model");
const JumboPokerClothes = require("./database/jumbopokerclothes.model");
const News = require("./database/news.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); 
  next();
});

//get methods

app.get('/v1/api/acepoker/clothes', async (req, res) => {
  const clothes = await AcePokerClothes.find();
  return res.json(clothes);
});

app.get('/v1/api/jumbopoker/clothes', async (req, res) => {
  const clothes = await JumboPokerClothes.find();
  return res.json(clothes);
});

app.get('/v1/api/news/newest', async (req, res) => {
  const clothes = await News.find().sort({created: "desc"});
  return res.json(clothes);
});

//post methods

app.post(`v1/api/acepoker/upload`, async (req, res) => {
  try{
    const { name, brand, price, audience, image } = req.body;
    const imageData = Buffer.from(image.data, "base64");
    const newAcePokerCloth = new AcePokerClothes({
      name,
      brand,
      price,
      audience,
      image: {
        data: imageData,
        contentType: image.contentType
      }
    });
    const acePokerSavedCloth = await newAcePokerCloth.save();
    res.json(acePokerSavedCloth);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

app.post(`v1/api/jumbopoker/upload`, async (req, res) => {
  try{
    const { name, brand, price, audience, image } = req.body;
    const imageData = Buffer.from(image.data, "base64");
    const newJumboPokerCloth = new JumboPokerClothes({
      name,
      brand,
      price,
      audience,
      image: {
        data: imageData,
        contentType: image.contentType
      }
    });
    const jumboPokerSavedCloth = await newJumboPokerCloth.save();
    res.json(jumboPokerSavedCloth);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

app.post(`v1/api/news/upload`, async (req, res) => {
  try{
    const { title, message } = req.body;
    const news = new News({
      title,
      message
    });
    const newNewsSaved = await news.save();
    res.json(newNewsSaved);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

//patch methods

app.patch("/v1/api/acepoker/:id/update", async (req, res, next) => {
  try {
    const acePokerCloth = await AcePokerClothes.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(acePokerCloth);
  } catch (err) {
    return next(err);
  }
});

app.patch("/v1/api/jumbopoker/:id/update", async (req, res, next) => {
  try {
    const jumboPokerCloth = await JumboPokerClothes.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(jumboPokerCloth);
  } catch (err) {
    return next(err);
  }
});

app.patch("/v1/api/news/:id/update", async (req, res, next) => {
  try {
    const newNew = await News.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(newNew);
  } catch (err) {
    return next(err);
  }
});

//delete methods

app.delete("/v1/api/acepoker/:id/delete", async (req, res, next) => {
  try {
    const acePokerCloth = await AcePokerClothes.findById(req.params.id);
    const deleted = await acePokerCloth.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.delete("/v1/api/jumbopoker/:id/delete", async (req, res, next) => {
  try {
    const jumboPokerCloth = await JumboPokerClothes.findById(req.params.id);
    const deleted = await jumboPokerCloth.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.delete("/v1/api/news/:id/delete", async (req, res, next) => {
  try {
    const formerNew = await News.findById(req.params.id);
    const deleted = await formerNew.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

//mongoDB connecting

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
