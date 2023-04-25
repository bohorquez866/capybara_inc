const accountModel = require("../../models/accounts");

const deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await accountModel.Accounts.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    return res.status(204).json({ message: "Account deleted" });
  } catch (error) {
    return next(error);
  }
};

module.exports = { deleteAccount };
