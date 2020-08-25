const express = require("express");
const app = express();
const PORT = process.env.PORT || 9002;
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let connectedPeers = new Map()
let peersRooms = {}

io.on("connection", (socket) => {
  let roomName = socket.handshake.query.roomName.trim().toLowerCase()+'webrtc'
  socket.to(roomName).emit('connection-success', {success: `/webrtcPeer#${socket.id}`})
  connectedPeers.set(socket.id, socket)
  
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room: room+'WEBRTC' });
    if(error) return callback(error);
    socket.join(user.room);
  });

  socket.on('disconnect', () =>{
    connectedPeers.delete(socket.id)
    const user = removeUser(socket.id);
    delete peersRooms[socket.id]
  })

  socket.on('offerOrAnswer', (data) => {
    let roomName = data.room.trim().toLowerCase()+'webrtc'

    for(const [socketID, socket] of connectedPeers.entries()){
      //jangan kirimke sendiri
      let userRoom = socket.handshake.query.roomName.trim().toLowerCase()+'webrtc'

      if(socketID !== data.socketID){
        if(userRoom == roomName){
          io.to(socketID).emit('offerOrAnswer', data.payload)
        }
      }
    }
  })

  socket.on('candidate', (data) => {
    let roomName = data.room.trim().toLowerCase()+'webrtc'

    for(const [socketID, socket] of connectedPeers.entries()){
      //jangan kirimke sendiri
      let userRoom = socket.handshake.query.roomName.trim().toLowerCase()+'webrtc'
      if(socketID !== data.socketID){
        if(userRoom == roomName){
          io.to(socketID).emit('candidate', data.payload)
        }
      }
    }
  })

  socket.on("needAnswer", function (txt) {
    socket.broadcast.emit("needAnswer", txt);
  });

});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`WebRTC Socket running on PORT ${PORT}`);
  });
}

module.exports = app;
