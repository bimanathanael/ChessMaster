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
let clients = []



io.on("connection", (socket) => {
  clients.push(socket);
  console.log(clients.length, 'clients.length')
  if (clients.length % 2 != 0 ) {
    socket.emit('setUp', {board: board.reverse(), turn, side: 'white'});
  } else {
    socket.emit('setUp', {board: board.reverse(), turn: false, side: 'black'});
  }
  
  socket.on('finishTurn', (data) => {
    turn = turn;
    board = data.board.reverse();
    socket.broadcast.emit('endTurn', {board, turn});
  })
  
});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`Now running on PORT ${PORT}`);
  });
}

module.exports = app;
