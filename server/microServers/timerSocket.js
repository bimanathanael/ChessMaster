const express = require("express");
const app = express();
const PORT = process.env.PORT || 9003;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {

  //Socket IO Timer
  socket.on("setUpdate", () => {
    socket.broadcast.emit("setUpdate");
  });

  socket.on("timerStart", () => {
    socket.broadcast.emit("timerStart");
  });

  socket.on("timerStop", () => {
    socket.broadcast.emit("timerStop");
  });
  //Socket IO Timer
  socket.on("timerStop2", () => {
    socket.broadcast.emit("timerStop2");
  });
  
});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`Timer Socket running on PORT ${PORT}`);
  });
}

module.exports = app;
