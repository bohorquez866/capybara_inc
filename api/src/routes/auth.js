const express = require("express");
const router = express.Router();

const loginController = require("../controllers/auth/login");
const logoutController = require("../controllers/auth/logout");
const registerController = require("../controllers/auth/createUser");

router.post("/login", loginController.loginPost);
router.post("/logout", logoutController.logoutPost);
router.post("/createUser", registerController.registerPost);

module.exports = router;