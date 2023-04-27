const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const UserTeams = Sequelize.define("user_teams", {
  user_id: sequelize.DataTypes.STRING,
  team_id: sequelize.DataTypes.STRING,
  start_date: sequelize.DataTypes.DATE,
  end_date: sequelize.DataTypes.DATE,
});

module.exports = { UserTeams };
