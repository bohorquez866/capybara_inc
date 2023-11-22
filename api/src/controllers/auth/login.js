const bcrypt = require("bcrypt");
const jwtHelpers = require("../../helpers/jwt/index");
const Sequelize = require("../../helpers/sqlInit");
const userModel = require("../../models/users");

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(401).send({ message: "Invalid email" });
    return;
  }

  const passwordIsValid = await bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    res.status(401).send({ message: "Invalid password" });
    return;
  }

  const token = jwtHelpers.generateAccessToken({
    username: user.username,
  });

  res.header("authorization", token);
  res.json({ message: "token generated succesfully", token, id: user.id });
};

module.exports = { loginPost };
