const sequelize = require("../../helpers/sqlInit");
const loginModel = require("../../models/users");
const lodash = require("lodash");

const getUserById = (req, res) => {
  const userId = req.params.id;

  loginModel.Users.findByPK(userId)
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

  if ((role && role === "admin") || role === "superuser") {
    loginModel.Users.findAll({ limit: +limit })
      .then((response) => {
        const hasValues = !lodash.isEmpty(response);
        console.log(hasValues);

        hasValues
          ? res.json({ response })
          : res.json({ errorMessage: "No users found" });
      })
      .catch((err) =>
        res.send({
          message: err.message,
        })
      );
    return;
  }

  res.send({
    message: "You are not authorized, you need to be an admin or superuser",
  });

  next();
};

module.exports = { getUserById, getAllUsers };
