const express = require("express");
const router = express.Router();

const { validateAccessToken } = require("../helpers/jwt/index");
const userRoutes = require("./users");
const authRoutes = require("./auth");
const accountsRoutes = require("./accounts");

router.use("/auth", authRoutes);
router.use("/users", validateAccessToken, userRoutes);
router.use("/accounts", validateAccessToken, accountsRoutes);

module.exports = router;
