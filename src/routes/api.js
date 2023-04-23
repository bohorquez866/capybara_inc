const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");
const registerController = require("../controllers/register");

//* login Endpoint
router.post("/auth/login", loginController.loginPost);

//* register Endpoint
router.post("/auth/register", registerController.registerPost);

module.exports = router;
