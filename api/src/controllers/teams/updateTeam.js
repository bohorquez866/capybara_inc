const { Teams } = require("../../models/teams");

const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const team = await Teams.findOne({ where: { id } });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    await team.update({ name });

    return res.json({
      message: `Team has been updated to ${name}`,
      team: team,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { updateTeam };
