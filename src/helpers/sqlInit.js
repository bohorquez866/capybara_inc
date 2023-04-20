const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Jb101226295!",
  database: "Capybara_inc",
});

connection.connect((err) => {
  err
    ? console.error(`Error connecting to database: ${err.stack}`)
    : console.log("Connected to database.");
});

module.exports = connection;
