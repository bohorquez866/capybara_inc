const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const authRoutes = require("./auth");
const accountsRoutes = require("./accounts");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/accounts", accountsRoutes);

module.exports = router;
