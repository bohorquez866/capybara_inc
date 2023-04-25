const userModel = require("../../models/users");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username = "", email = "", password = "" } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedValues = {
    ...(username && { username }),
    ...(email && { email }),
    ...(password && { password: hashedPassword }),
  };

  try {
    const [rowsUpdated] = await userModel.Users.update(updatedValues, {
      where: { id: userId },
    });

    if (rowsUpdated > 0) {
      return res.send({
        message: "User data updated successfully",
      });
    }

    return res.status(404).send({
      message: "User not found",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      error: err,
    });
  }
};

module.exports = { updateUser };
