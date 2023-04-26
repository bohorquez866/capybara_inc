const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const Teams = Sequelize.define("teams", {
  name: sequelize.DataTypes.STRING,
});

module.exports = { Teams };
