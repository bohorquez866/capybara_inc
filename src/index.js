const express = require("express");
const bodyParser = require("body-parser");
const apiAuthRoutes = require("./routes/auth");
// const apiUserRoutes = require("./routes/users");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", apiAuthRoutes);

const port = process.env.PORT || 8080;
app.listen(port);
