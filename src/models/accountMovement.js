const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const PeopleAccounts = Sequelize.define("people_movements", {
  user_id: sequelize.DataTypes.INTEGER,
  source_team: sequelize.DataTypes.INTEGER,
  target_team: sequelize.DataTypes.INTEGER,
});

module.exports = { PeopleAccounts };
