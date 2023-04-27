const express = require("express");
const bodyParser = require("body-parser");
const { swaggerDocs: v1SwaggerDocs } = require("./routes/swagger");
const apiRoutes = require("./routes");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", apiRoutes);

app.listen(port, () => {
  v1SwaggerDocs(app, port);
});

module.exports = app;
