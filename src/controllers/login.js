const app = require("express")();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../helpers/sqlInit");
const jwtHelpers = require("../jwt/index");

const loginPost = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE name = '${username}'`;

  connection.query(query, (error, results) => {
    if (error) throw error;
    const user = results[0];

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid || !user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
  });

  const token = jwtHelpers.generateToken({ username: user.username });
  res.header("authorization", token).json({ message: "success", token });
  return;
};

module.exports = { loginPost };
