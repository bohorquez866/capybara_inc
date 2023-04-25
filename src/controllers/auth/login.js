const bcrypt = require("bcrypt");
const jwtHelpers = require("../../jwt/index");
const Sequelize = require("../../helpers/sqlInit");
const loginModel = require("../../models/users");

const loginPost = (req, res) => {
  const { username, password } = req.body;

  loginModel.Users.findAll({
    where: {
      username: username,
    },
  }).then((user) => {
    const passwordIsValid = bcrypt.compareSync(password, user?.password || "*");

    if (!passwordIsValid || !user) {
      res.status(401).send({ message: "Invalid credentials", value: user });
      return;
    }

    const token = jwtHelpers.generateToken({
      username: user.username,
    });
    res.header("authorization", token).json({ message: "success", token });
  });
};

module.exports = { loginPost };
