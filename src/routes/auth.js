const express = require("express");
const router = express.Router();

const loginController = require("../controllers/auth/login");
const registerController = require("../controllers/auth/register");
const logoutController = require("../controllers/auth/logout");
const userController = require("../controllers/users/getUsers");
const updateUserController = require("../controllers/users/updateUserData");

//* login Endpoint
router.post("/auth/login", loginController.loginPost);

//* register Endpoint
router.post("/auth/register", registerController.registerPost);

//* logout Endpoint
router.post("/auth/logout", logoutController.logoutPost);

router.get("/getAllUsers", userController.getAllUsers);

//* get user by id
router.get("/getUser/:id", userController.getUserById);

//* update user by id

router.put("/updateUser/:id", updateUserController.updateUser);

module.exports = router;
