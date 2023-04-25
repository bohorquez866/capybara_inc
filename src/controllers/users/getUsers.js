const userModel = require("../../models/users");
const lodash = require("lodash");

const getUserById = (req, res) => {
  const userId = req.params.id;

  userModel.Users.findByPK(userId)
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
  const { limit, role } = req.body;

  if (!role === "admin" || !role === "superuser") {
    return res.status(400).send({
      message: "You are not authorized, you need to be an admin or superuser",
    });
  }

  userModel.Users.findAll({ limit: +limit })
    .then((response) => {
      const hasValues = !lodash.isEmpty(response);

      hasValues
        ? res.json({ response })
        : res.json({ errorMessage: "No users found" });
    })
    .catch((err) =>
      res.send({
        message: err.message,
      })
    );
};

module.exports = { getUserById, getAllUsers };
