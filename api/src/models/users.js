const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const Users = Sequelize.define("users", {
  email: sequelize.DataTypes.STRING,
  password: sequelize.DataTypes.STRING,
  role: sequelize.DataTypes.STRING,
  username: sequelize.DataTypes.STRING,
  english_level: sequelize.DataTypes.STRING,
  cv_url: sequelize.DataTypes.STRING,
  name: sequelize.DataTypes.STRING,
});

module.exports = { Users };
