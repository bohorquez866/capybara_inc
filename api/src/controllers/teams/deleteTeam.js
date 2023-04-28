const express = require("express");

const { Teams } = require("../../models/teams");

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Teams.findOne({ where: { id } });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    await team.destroy();

    return res.json({
      message: `Team ${team.name} has been removed`,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { deleteTeam };
