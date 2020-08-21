const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 9000;
const routes = require("./routes");
const server = require("http").createServer();
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

let board = [
  [5, 4, 3, 2, 1, 3, 4, 5],
  [6, 6, 6, 6, 6, 6, 6, 6],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [-6, -6, -6, -6, -6, -6, -6, -6],
  [-5, -4, -3, -1, -2, -3, -4, -5],
];

let turn = true;
let clients = []

let connectedPeers = new Map()

io.on("connection", (socket) => {
  clients.push(socket);
  if (clients.length < 2) {
    socket.emit('setUp', {board: board.reverse(), turn, side: 'white'});
  } else {
    socket.emit('setUp', {board: board.reverse(), turn: false, side: 'black'});
  }

  socket.on('finishTurn', (data) => {
    turn = turn;
    board = data.board.reverse();
    socket.broadcast.emit('endTurn', {board, turn});
  })
  
  
  // socket.emit('connection-success', {success: `/webrtcPeer#${socket.id}`})
  connectedPeers.set(socket.id, socket)

  socket.on('disconnect', () =>{
    console.log('disconnected')
    connectedPeers.delete(socket.id)
  })

  socket.on('offerOrAnswer', (data) => {
    //kirim ke peer lain kalau ada
    for(const [socketID, socket] of connectedPeers.entries()){
      //jangan kirimke sendiri
      if(socketID !== data.socketID){
        console.log(socketID, data.payload.type)
        socket.emit('offerOrAnswer', data.payload)
      }
    }
  })

  socket.on('candidate', (data) => {
    //kirim ke peer lain kalau ada
    for(const [socketID, socket] of connectedPeers.entries()){
      //jangan kirimke sendiri
      if(socketID !== data.socketID){
        console.log(socketID, data.payload.type)
        socket.emit('candidate', data.payload)
      }
    }
  })

  socket.on("move", function (url) {
    socket.broadcast.emit("move");
  });
  socket.on("teks", function (txt) {
    socket.broadcast.emit("teks", txt);
  });
});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`Now running on PORT ${PORT}`);
  });
}

module.exports = app;
