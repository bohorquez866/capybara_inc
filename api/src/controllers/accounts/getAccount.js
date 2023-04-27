const accountModel = require("../../models/accounts");
const lodash = require("lodash");

const getAccountById = (req, res) => {
  const accountId = req.params.id;

  accountModel.Accounts.findByPK(accountId)
    .then((acct) => {
      const hasValues = !lodash.isEmpty(acct);

      hasValues
        ? res.json({ user })
        : res.json({ errorMessage: "No Account found" });
    })
    .catch((err) =>
      res.send({
        message: err.message,
      })
    );
};

const getAllAccounts = (req, res) => {
  const { limit, role } = req.body;

  if (role !== "superuser") {
    return res.status(400).send({
      message: "You are not authorized to do this operation",
      status: "error",
    });
  }

  accountModel.Accounts.findAll({ limit: +limit })
    .then((response) => {
      const hasValues = !lodash.isEmpty(response);

      hasValues
        ? res.json({ response })
        : res.status(404).json({ errorMessage: "No accounts were found" });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
};

module.exports = { getAccountById, getAllAccounts };
