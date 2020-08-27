const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 9000;
const routes = require("./routes");
let server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

server = app.listen(PORT, function () {
  console.log(`NOW RUNNING ON PORT ${PORT}`);
});

module.exports = server;
