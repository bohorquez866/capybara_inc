const express = require("express");
const bodyParser = require("body-parser");
const { swaggerDocs } = require("./routes/swagger/swagger");
const apiRoutes = require("./routes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", apiRoutes);

app.listen(port);

// module.exports = app;
