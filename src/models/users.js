const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const Users = Sequelize.define("users", {
  email: sequelize.DataTypes.STRING,
  password: sequelize.DataTypes.STRING,
  role: sequelize.DataTypes.STRING,
  username: sequelize.DataTypes.STRING,
});

const Accounts = Sequelize.define("accounts", {
  account_username: sequelize.DataTypes.STRING,
  client_name: sequelize.DataTypes.STRING,
  operation_performer: sequelize.DataTypes.STRING,
  english_level: sequelize.DataTypes.STRING,
  user_id: sequelize.DataTypes.INTEGER,
  cv_url: sequelize.DataTypes.STRING,
});

module.exports = { Users, Accounts };
