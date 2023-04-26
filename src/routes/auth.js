const express = require("express");
const router = express.Router();

const loginController = require("../controllers/auth/login");
const logoutController = require("../controllers/auth/logout");
const registerController = require("../controllers/auth/createUser");

router.post("/login", loginController.loginPost);
router.post("/logout", logoutController.logoutPost);
router.post("/createUser", registerController.registerPost);

module.exports = router;

//! $2b$10$NMOtimy6leyBaKXD.aUvQusNW5tL45PwPJrI.7BV9Id07w3PF8JHG
