const { Teams } = require("../../models/teams");

const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const team = await Teams.create({ name });

    return res.status(201).json({ team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create team" });
  }
};

module.exports = { createTeam };
