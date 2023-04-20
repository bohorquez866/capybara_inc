const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../helpers/sqlInit");
const app = express();

// Create a MySQL connection pool

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to register a new user
const registerPost = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    account_name,
    client_name,
    operation_name,
    english_level,
    cv_url,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Start a MySQL transaction
    await connection.query("START TRANSACTION");

    // Insert the user into the users table
    const userInsertResult = await connection.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    // Get the ID of the new user
    const userId = userInsertResult.insertId;
    console.log(userInsertResult);

    // Insert the account into the accounts table
    await connection.query(
      "INSERT INTO accounts (account_name, client_name, operation_name, english_level, user_id, cv_url) VALUES (?, ?, ?, ?, ?, ?)",
      [account_name, client_name, operation_name, english_level, userId, cv_url]
    );

    // Commit the transaction
    await connection.query("COMMIT");

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId }, "");

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    // Roll back the transaction if an error occurs
    await connection.query("ROLLBACK");
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

module.exports = { registerPost };
