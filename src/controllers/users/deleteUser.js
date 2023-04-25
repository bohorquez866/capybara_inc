const userModel = require("../../models/users");

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

module.exports = { deleteUser };
