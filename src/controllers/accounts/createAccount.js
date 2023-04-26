const sequelize = require("../../helpers/sqlInit");
const accountModel = require("../../models/accounts");
const lodash = require("lodash");

const addAccountRegistry = (req, res, next) => {
  const { account_name, client_name, operation_performer, user_id } = req.body;
  const parsedIntUserId = parseInt(user_id);

  accountModel.Accounts.create({
    account_name,
    client_name,
    operation_performer,
    user_id: parsedIntUserId,
  })
    .then((data) => {
      return res.status(201).json({
        message: "Account added successfully",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error adding account",
        err,
        vals: req.body,
      });
    });
};

module.exports = { addAccountRegistry };
