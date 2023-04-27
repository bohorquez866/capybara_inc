const accountModel = require("../../models/accounts");
const bcrypt = require("bcrypt");

const updateAccount = async (req, res) => {
  const userId = req.params.id;
  const {
    account_name = "",
    client_name = "",
    operation_performer = "",
  } = req.body;

  const updatedValues = {
    ...(account_name && { account_name }),
    ...(client_name && { client_name }),
    ...(operation_performer && { operation_performer }),
  };

  try {
    const [rowsUpdated] = await accountModel.Accounts.update(updatedValues, {
      where: { id: userId },
    });

    if (rowsUpdated > 0) {
      return res.send({
        message: "Account data updated successfully",
      });
    }

    return res.status(404).send({
      message: "Account data not found",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      error: err,
    });
  }
};

module.exports = { updateAccount };
