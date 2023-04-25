const express = require("express");
const router = express.Router();

const loginController = require("../controllers/auth/login");
const logoutController = require("../controllers/auth/logout");

router.post("/login", loginController.loginPost);
router.post("/logout", logoutController.logoutPost);

module.exports = router;
