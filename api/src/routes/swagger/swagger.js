const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("../../../swagger.json");

router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

router.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerFile);
});

module.exports = router;