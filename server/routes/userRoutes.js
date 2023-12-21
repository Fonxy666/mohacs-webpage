const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth");
// router.post("/v1/api/users/register", userControllers.registerUser);
router.post("/v1/api/users/login", userControllers.loginUser);

router.get('/api/users', verifyToken('admin'), userControllers.getUsers);

module.exports = router;