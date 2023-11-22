const bcrypt = require("bcrypt");
require("dotenv").config();
const userModel = require("../../models/users");
const { UUIDV4 } = require("sequelize");

const registerPost = async (req, res) => {
  const { email, password, role, username, english_level, cv_url, name } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const queryValues = {
    name,
    email,
    password: hashedPassword,
    username,
    role,
    english_level,
    cv_url,
    createAt: new Date(),
    updatedAt: new Date(),
  };

  if (role !== "user" && role !== "admin") {
    return res.status(400).send({ error: "Role must be user or admin" });
  }

  await userModel.Users.create(queryValues)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).send({ error: err }));
};

module.exports = { registerPost };
