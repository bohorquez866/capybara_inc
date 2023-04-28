const express = require("express");
const router = express.Router();

// const geController = require("../controllers/users/getUsers");
const getTeamsController = require("../controllers/teams/getTeams");
const deleteTeamController = require("../controllers/teams/deleteTeam");
const createTeamController = require("../controllers/teams/createTeam");
const updateTeamController = require("../controllers/teams/updateTeam");

router.get("/getAllTeams", getTeamsController.getAllTeams);
router.get("/getTeamById/:id", getTeamsController.getTeamById);
router.post("/createTeam", createTeamController.createTeam);
router.delete("/deleteTeam/:id", deleteTeamController.deleteTeam);
router.put("/updateTeam/:id", updateTeamController.updateTeam);

module.exports = router;
