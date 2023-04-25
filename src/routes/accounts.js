const express = require("express");
const router = express.Router();
const createAccountRegistry = require("../controllers/accounts/createAccount");
const updateAccountRegistry = require("../controllers/accounts/updateAccount");
const deleteAccountRegistry = require("../controllers/accounts/deleteAccount");

router.post("/addAccountRegistry", createAccountRegistry.addAccountRegistry);
router.put("/updateAccountRegistry", updateAccountRegistry.updateAccount);
router.delete("deleteAccountRegistry", deleteAccountRegistry.deleteAccount);

module.exports = router;
