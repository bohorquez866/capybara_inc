const { Users } = require("../../models/users");
const { Teams } = require("../../models/teams");
const { UserTeams } = require("../../models/userTeams");
const { PeopleMovements } = require("../../models/peopleMovement");

const moveUserToTeam = async (req, res) => {
  const { userId, sourceTeamId, targetTeamId, start_date } = req.body;

  try {
    const user = await Users.findOne({ where: { id: userId } });
    const sourceTeam = await Teams.findOne({ where: { id: sourceTeamId } });
    const targetTeam = await Teams.findOne({ where: { id: targetTeamId } });

    const isUserTargetTeam = await UserTeams.findOne({
      where: { user_id: userId, team_id: targetTeamId },
    });

    if (isUserTargetTeam) {
      return res
        .status(400)
        .json({ error: "User is already a member of the target team" });
    }

    await UserTeams.update(
      { end_date: new Date() },
      { where: { user_id: userId, team_id: sourceTeamId } }
    );

    await UserTeams.create({
      user_id: userId,
      team_id: targetTeamId,
      start_date,
    });

    await PeopleMovements.create({
      user_id: userId,
      source_team: sourceTeamId,
      target_team: targetTeamId,
    });

    res.json({
      message: `User ${user.name} has been moved from ${sourceTeam.name} to ${targetTeam.name}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { moveUserToTeam };
