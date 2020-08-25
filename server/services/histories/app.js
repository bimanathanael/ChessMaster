const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 9005;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, function () {
  console.log(`NOW RUNNING ON PORT ${PORT}`);
});

module.exports = app;
