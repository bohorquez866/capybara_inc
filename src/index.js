const app = require("express")();

app.get("/", (req, res, next) => {
  res.json({ message: "some text for docker testing" });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Gondor Calls for Aid, and Rohan Will Answer at localhost:${port}`
  );
});
