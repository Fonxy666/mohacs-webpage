const express = require('express');
const router = express.Router();
const newsController = require("../controllers/news.controller");
const { verifyToken } = require("../middlewares/auth");
router.get("/v1/api/news/newest", newsController.getLatestNews);
router.get("/v1/api/news/upload", verifyToken("Admin"), newsController.uploadNew);
router.get("/v1/api/news/:id/update", verifyToken("Admin"), newsController.patchNew);
router.get("/v1/api/news/:id/delete", verifyToken("Admin"), newsController.deleteNew);

module.exports = router;