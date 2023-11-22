const userModel = require("../../models/users");
const lodash = require("lodash");

const getUserById = (req, res) => {
  const userId = req.params.id;

  userModel.Users.findByPk(userId)
    .then((user) => {
      const hasValues = !lodash.isEmpty(user);

      hasValues
        ? res.json({ user })
        : res.json({ errorMessage: "No user found" });
    })
    .catch((err) =>
      res.send({
        message: err.message,
      })
    );
};

const getAllUsers = (req, res) => {
  const { limit = 100, role } = req.body;

  if (role == "user") {
    return res.status(400).send({
      message: "You are not authorized to do this operation",
      status: "error",
    });
  }

  userModel.Users.findAll({ limit: +limit })
    .then((response) => {
      const hasValues = !lodash.isEmpty(response);

      hasValues
        ? res.json({ response })
        : res.status(404).json({ errorMessage: "No users found" });
    })
    .catch((err) =>
      res.send({
        message: err.message,
      })
    );
};

module.exports = { getUserById, getAllUsers };
