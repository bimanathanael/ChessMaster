const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

console.log(app.get("env"), "running on");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

if (app.get("env") === "development") {
  app.listen(PORT, function () {
    console.log(`Now running on PORT ${PORT}`);
  });
}

module.exports = app;
