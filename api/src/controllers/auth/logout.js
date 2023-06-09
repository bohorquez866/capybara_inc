const revokeJWT = require("../../helpers/jwt/index");

const logoutPost = (req, res, next) => {
  revokeJWT.revokeAccessToken(req, res, next);
};

module.exports = { logoutPost };
