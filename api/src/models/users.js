const sequelize = require("sequelize");
const Sequelize = require("../helpers/sqlInit");

const Users = Sequelize.define("users", {
  email: {
    type: sequelize.DataTypes.STRING,
  },
  password: {
    type: sequelize.DataTypes.STRING,
  },
  role: {
    type: sequelize.DataTypes.STRING,
  },
  username: {
    type: sequelize.DataTypes.STRING,
  },
  english_level: {
    type: sequelize.DataTypes.STRING,
  },
  cv_url: {
    type: sequelize.DataTypes.STRING,
  },
  name: {
    type: sequelize.DataTypes.STRING,
  },
});

module.exports = { Users };
