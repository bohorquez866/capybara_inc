const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const Accounts = Sequelize.define("accounts", {
  account_username: sequelize.DataTypes.STRING,
  client_name: sequelize.DataTypes.STRING,
  operation_performer: sequelize.DataTypes.STRING,
  user_id: sequelize.DataTypes.INTEGER,
});

module.exports = { Accounts };
