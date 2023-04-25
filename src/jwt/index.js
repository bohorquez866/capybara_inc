const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "30d" });
}

function validateAccessToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  if (!accessToken) res.send.json({ error: "No token provided" });

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) res.json({ error: "Invalid token" });
    next();
  });
}

function revokeAccessToken(req, res, next) {
  const accessToken = req.headers["authorization"];

  if (accessToken) {
    res.setHeader("Authorization", "");
    res.redirect("/login");
  }
}

module.exports = {
  generateAccessToken,
  validateAccessToken,
  revokeAccessToken,
};
