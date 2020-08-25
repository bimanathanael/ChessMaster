const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9001;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let boardFix = [
  [5, 4, 3, 2, 1, 3, 4, 5],
  [6, 6, 6, 6, 6, 6, 6, 6],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [-6, -6, -6, -6, -6, -6, -6, -6],
  [-5, -4, -3, -2, -1, -3, -4, -5],
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
let clients = []


io.on("connection", (socket) => {
  clients.push(socket);
  
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if(error) return callback(error);
    socket.join(user.room);

    if (getUsersInRoom(user.room).length %2 != 0 ) {
      io.to(socket.id).emit('setUp', {board: boardFix.reverse(), turn, side: 'white'});
    } else {
      io.to(socket.id).emit('setUp', {board: boardFix.reverse(), turn: false, side: 'black'});
    }
    
  });

  socket.on('disconnect', () =>{
    console.log(clients.length, 'clients.length')
  })

  socket.on('finishTurn', (data) => {
    const user = getUser(socket.id);
    turn = turn;
    board = data.board.reverse();
    socket.broadcast.to(user.room).emit('endTurn', {board, turn});
  })

});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`Board Socket running on PORT ${PORT}`);
  });
}

module.exports = app;
