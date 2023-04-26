const bcrypt = require("bcrypt");
require("dotenv").config();
const userModel = require("../../models/users");

const registerPost = async (req, res) => {
  const { email, password, role, username, english_level, cv_url } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const queryValues = {
    email,
    password: hashedPassword,
    username,
    role,
    english_level,
    cv_url,
  };

  if (role !== "user" && role !== "admin") {
    return res.status(400).send({ error: "Role must be user or admin" });
  }

  await userModel.Users.create(queryValues)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).send({ error: err }));
};

module.exports = { registerPost };
