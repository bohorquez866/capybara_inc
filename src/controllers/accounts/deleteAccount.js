const accountModel = require("../../models/accounts");

const deleteAccount = async (req, res, next) => {
  const { id } = req.params;
  const account = await accountModel.Accounts.findByPk(id);

  if (!account) {
    return res.status(404).json({ error: "account not found" });
  }

  await account
    .destroy()
    .then(() => res.status(204).json({ message: "Account deleted" }))
    .catch((err) => res.send({ err }));
};

module.exports = { deleteAccount };
