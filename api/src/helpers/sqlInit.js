const Sequalize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequalize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect DB: ", error));
module.exports = sequelize;
