const express = require("express");
const router = express.Router();
const createAccountRegistry = require("../controllers/accounts/addAccount");

router.post("/addAccountRegistry", createAccountRegistry.addAccountRegistry);

module.exports = router;
