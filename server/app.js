const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.listen(PORT, function () {
//   console.log(`Now running on PORT ${PORT}`);
// });

module.exports = app;
