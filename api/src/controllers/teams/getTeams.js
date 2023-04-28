const { Teams } = require("../../models/teams");

const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Teams.findAll();
    res.json(teams);
  } catch (err) {
    res.status(404).json({ message: "No team was found" });
  }
};

const getTeamById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const team = await Teams.findOne({
      where: {
        id: id,
      },
    });

    if (!team) {
      res.status(404).json({ message: `Team with ID ${id} not found` });
      return;
    }

    res.json(team);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
};
module.exports = { getAllTeams, getTeamById };
