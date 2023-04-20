const app = require("express")();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../helpers/sqlInit");

const loginPost = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM accounts WHERE account_username = '${username}'`;

  connection.query(query, (error, results) => {
    if (error) throw error;

    const user = results[0];

    if (!user) {
      return res.send({ error: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;

      if (!result) {
        res.send("Incorrect password");
        return;
      }

      // Create a new JWT token
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.send({ token });
    });
  });
};

// Middleware for verifying JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403);
    req.user = decodedToken;

    res.send("token found");
  });
};

module.exports = { loginPost, authMiddleware };
