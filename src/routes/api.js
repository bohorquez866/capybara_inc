const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");
const registerController = require("../controllers/register");

//* login Endpoint
router.post("/login", loginController.loginPost);
router.get("/login", loginController.authMiddleware);

//* register Endpoint
router.post("/register", registerController.registerPost);

module.exports = router;
