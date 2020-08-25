const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9001;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const setUpBoard = [
  [5, 4, 3, 2, 1, 3, 4, 5],
  [6, 6, 6, 6, 6, 6, 6, 6],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [-6, -6, -6, -6, -6, -6, -6, -6],
  [-5, -4, -3, -1, -2, -3, -4, -5],
];

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
  //START : HIKA Timer

  socket.on("timerStart", (enemy) => {
    socket.broadcast.emit("timerStart", enemy);
  });
  socket.on("getEnemy", (enemy) => {
    socket.broadcast.emit("getEnemy", enemy);
  });

  socket.on("timerStop", () => {
    socket.broadcast.emit("timerStop");
  });
  socket.on("timerStop2", () => {
    socket.broadcast.emit("timerStop2");
  });

  socket.on("moveToLeaderboard", () => {
    io.emit("moveToLeaderboard");
  });
  socket.on("moveToLeaderboard2", () => {
    socket.broadcast.emit("moveToLeaderboard2");
  });
  //END : HIKA Timer

  //START:  FATUR Chess
  clients.push(socket);
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.join(user.room);

    if (getUsersInRoom(user.room).length % 2 != 0) {
      io.to(socket.id).emit("setUp", {
        board: setUpBoard.reverse(),
        turn,
        side: "white",
      });
      io.to(socket.id).emit("showButton", true);
    } else {
      io.to(socket.id).emit("setUp", {
        board: setUpBoard.reverse(),
        turn: false,
        side: "black",
      });
      io.to(socket.id).emit("showButton", false);
    }
  });
  // if (clients.length % 2 != 0) {
  //   socket.emit("setUp", { board: setUpBoard.reverse(), turn, side: "white" });
  //   socket.emit("showButton", true);
  // } else {
  //   socket.emit("setUp", {
  //     board: setUpBoard.reverse(),
  //     turn: false,
  //     side: "black",
  //   });
  //   socket.emit("showButton", false);
  // }
  socket.on("disconnect", () => {
    console.log(clients.length, "clients.length");
  });

  socket.on("finishTurn", (data) => {
    const user = getUser(socket.id);
    turn = turn;
    board = data.board.reverse();
    socket.broadcast.to(user.room).emit("endTurn", { board, turn });
    // socket.broadcast.emit("endTurn", { board, turn });
  });

  socket.on("pawn-evolution", (data) => {
    board = data.board.reverse();
    socket.broadcast.to(user.room).emit("pawn evolution", { board });
    // socket.broadcast.emit("pawn evolution", {board});
  });
});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`Board Socket running on PORT ${PORT}`);
  });
}

module.exports = app;
