const express = require('express');
const router = express.Router();
const clothController = require("../controllers/cloth.controller");
const { verifyToken } = require("../middlewares/auth");
const JumboPokerClothes = require("../database/jumbopokerclothes.model");
const logForMultiElementsText = "Jumbo Poker Clothes";
const logForSingleElement = "Jumbo Poker Cloth";

router.get("/v1/api/jumbo-poker/clothes", async (req, res) => {
    await clothController.getClothes(req, res, JumboPokerClothes, logForMultiElementsText);
});
router.post("/v1/api/jumbo-poker/upload", verifyToken("Admin"), async (req, res) => {
    await clothController.uploadCloth(req, res, JumboPokerClothes, logForSingleElement);
});
router.patch("/v1/api/jumbo-poker/:id/update", verifyToken("Admin"), async (req, res) => {
    await clothController.patchCloth(req, res, JumboPokerClothes, logForSingleElement);
});
router.delete("/v1/api/jumbo-poker/:id/delete", verifyToken("Admin"),  async (req, res) => {
    await clothController.deleteCloth(req, res, JumboPokerClothes, logForSingleElement);
});

module.exports = router;