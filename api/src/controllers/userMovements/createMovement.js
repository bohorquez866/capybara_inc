const { User } = require("../../models/users");
const { Teams } = require("../../models/teams");
const { UserTeams } = require("../../models/userTeams");
const { PeopleMovements } = require("../../models/peopleMovement");

const moveUserToTeam = async (req, res) => {
  const { userId, sourceTeamId, targetTeamId, start_date } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    const sourceTeam = await Teams.findOne({ where: { id: sourceTeamId } });
    const targetTeam = await Teams.findOne({ where: { id: targetTeamId } });

    const isUserTargetTeam = await UserTeams.findOne({
      where: { user_id: userId, team_id: targetTeamId },
    });

    if (isUserTargetTeam) {
      res
        .status(400)
        .send({ error: "User is already a member of the target team" });
      return;
    }

    await UserTeams.destroy({
      where: { user_id: userId, team_id: sourceTeamId },
    });

    await UserTeams.create({
      user_id: userId,
      team_id: targetTeamId,
      start_date,
    });

    // Log the movement in the people_movements table
    await PeopleMovements.create({
      user_id: userId,
      source_team: sourceTeamId,
      target_team: targetTeamId,
    });

    res.json({
      message: `User ${user.name} has been moved from ${sourceTeam.name} to ${targetTeam.name}`,
    });
    return;
  } catch (error) {
    res.status(500).send({ error: "Something went wrong", error });
  }
};

module.exports = { moveUserToTeam };
