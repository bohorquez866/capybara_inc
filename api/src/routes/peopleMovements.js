const express = require("express");
const router = express.Router();

const createMovementController = require("../controllers/userMovements/createMovement");

router.post("/moveUserToTeam", createMovementController.moveUserToTeam);
router.get("/logs", createMovementController.getUserMovements);

module.exports = router;
