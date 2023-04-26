const bcrypt = require("bcrypt");
const jwtHelpers = require("../../helpers/jwt/index");
const Sequelize = require("../../helpers/sqlInit");
const userModel = require("../../models/users");

const loginPost = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.Users.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.status(401).send({ message: "Invalid credentials" });
    return;
  }

  const passwordIsValid = await bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    res.status(401).send({ message: "Invalid credentials" });
    return;
  }

  const token = jwtHelpers.generateAccessToken({
    username: user.username,
  });

  res.header("authorization", token);
  res.json({ message: "success", token });
};

module.exports = { loginPost };
