const express = require("express");
const router = express.Router();
const userController = require("../controllers/users/getUsers");
const updateUserController = require("../controllers/users/updateUserData");
const deleteUserController = require("../controllers/users/deleteUser");

router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:id", userController.getUserById);
router.put("/updateUser/:id", updateUserController.updateUser);
router.delete("/deleteUser/:id", deleteUserController.deleteUser);

module.exports = router;
