const bcrypt = require("bcrypt");
require("dotenv").config();
const userModel = require("../../models/users");

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.Users.create({
      email,
      password: hashedPassword,
      username: account_username,
      role,
      english_level,
      cv_url,
    });

    const userId = user.dataValues.id;

    const account = await userModel.Accounts.create({
      account_username,
      client_name,
      operation_performer,
      user_id: userId,
    });

    res.json(account);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = { registerPost };
