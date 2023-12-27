const express = require('express');
const router = express.Router();
const clothController = require("../controllers/cloth.controller");
const { verifyToken } = require("../middlewares/auth");
const AcePokerClothes = require("../database/acePokerClothes.model");
const logForMultiElementsText = "Ace Poker Clothes";
const logForSingleElement = "Ace Poker Cloth";

router.get("/v1/api/ace-poker/clothes", async (req, res) => {
    await clothController.getClothes(req, res, AcePokerClothes, logForMultiElementsText);
});
router.post("/v1/api/ace-poker/upload", verifyToken("Admin"), async (req, res) => {
    await clothController.uploadCloth(req, res, AcePokerClothes, logForSingleElement);
});
router.patch("/v1/api/ace-poker/:id/update", verifyToken("Admin"), async (req, res) => {
    await clothController.patchCloth(req, res, AcePokerClothes, logForSingleElement);
});
router.delete("/v1/api/ace-poker/:id/delete", verifyToken("Admin"),  async (req, res) => {
    await clothController.deleteCloth(req, res, AcePokerClothes, logForSingleElement);
});

module.exports = router;