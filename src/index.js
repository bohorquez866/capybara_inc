const express = require("express");
const apiRoutes = require("./routes/api");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

const port = process.env.PORT || 8080;
app.listen(port);
