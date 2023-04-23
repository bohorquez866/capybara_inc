const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/users");

const registerPost = async (req, res) => {
  const {
    email,
    password,
    role,
    account_username,
    client_name,
    operation_performer,
    english_level,
    cv_url,
  } = req.body;

  try {
    const user = await userModel.Users.create({
      email,
      password,
      username: account_username,
      role,
    });

    const userId = user.dataValues.id;
    const account = await userModel.Accounts.create({
      account_username,
      client_name,
      operation_performer,
      english_level,
      user_id: userId,
      cv_url,
    });

    res.json(account);
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = { registerPost };
