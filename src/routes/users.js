const express = require("express");
const router = express.Router();
const userController = require("../controllers/users/getUsers");
const registerController = require("../controllers/users/createUser");
const updateUserController = require("../controllers/users/updateUserData");
const deleteUserController = require("../controllers/users/deleteUser");

router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:id", userController.getUserById);
router.post("/createUser", registerController.registerPost);
router.put("/updateUser/:id", updateUserController.updateUser);
router.delete("/deleteUser/:id", deleteUserController.deleteUser);

module.exports = router;
