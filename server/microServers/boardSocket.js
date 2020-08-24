const express = require("express");
const app = express();
const PORT = process.env.PORT || 9001;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let board = [
  [5, 4, 3, 2, 1, 3, 4, 5],
  [6, 6, 6, 6, 6, 6, 6, 6],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [-6, -6, -6, -6, -6, -6, -6, -6],
  [-5, -4, -3, -2, -1, -3, -4, -5],
];

let turn = true;
let clients = [];

io.on("connection", (socket) => {
  socket.on("timerStart", () => {
    socket.broadcast.emit("timerStart");
  });

  socket.on("timerStop", () => {
    socket.broadcast.emit("timerStop");
  });
  socket.on("timerStop2", () => {
    socket.broadcast.emit("timerStop2");
  });
  clients.push(socket);
  console.log(clients.length, "clients.length");
  if (clients.length % 2 != 0) {
    socket.emit("setUp", { board: board.reverse(), turn, side: "white" });
    socket.emit("showButton", true);
  } else {
    socket.emit("setUp", {
      board: board.reverse(),
      turn: false,
      side: "black",
    });
    socket.emit("showButton", false);
  }

  socket.on("finishTurn", (data) => {
    turn = turn;
    board = data.board.reverse();
    socket.broadcast.emit("endTurn", { board, turn });
  });
});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`Now running on PORT ${PORT}`);
  });
}

module.exports = app;