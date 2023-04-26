const express = require("express");
const router = express.Router();
const createAccountRegistryController = require("../controllers/accounts/createAccount");
const updateAccountRegistryController = require("../controllers/accounts/updateAccount");
const deleteAccountRegistryController = require("../controllers/accounts/deleteAccount");
const getAccountsController = require("../controllers/accounts/getAccount");

router.get("/getAccountById/:id", getAccountsController.getAccountById);

router.post(
  "/addAccountRegistry",
  createAccountRegistryController.addAccountRegistry
);

router.put(
  "/updateAccountRegistry",
  updateAccountRegistryController.updateAccount
);

router.delete(
  "deleteAccountRegistry",
  deleteAccountRegistryController.deleteAccount
);

module.exports = router;
