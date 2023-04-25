const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const PeopleAccounts = Sequelize.define("people_movements", {
  end_date: sequelize.DataTypes.DATE,
  start_date: sequelize.DataTypes.DATE,
  user_id: sequelize.DataTypes.INTEGER,
  account_id: sequelize.DataTypes.INTEGER,
});

module.exports = { PeopleAccounts };
