const express = require("express");
const app = express();
const PORT = process.env.PORT || 9002;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let connectedPeers = new Map()

io.on("connection", (socket) => {

  socket.broadcast.emit('connection-success', {success: `/webrtcPeer#${socket.id}`})
  connectedPeers.set(socket.id, socket)

  socket.on('disconnect', () =>{
    // console.log('disconnected')
    connectedPeers.delete(socket.id)
  })

  socket.on('offerOrAnswer', (data) => {
    //kirim ke peer lain kalau ada
    for(const [socketID, socket] of connectedPeers.entries()){
      //jangan kirimke sendiri
      if(socketID !== data.socketID){
        socket.emit('offerOrAnswer', data.payload)
      }
    }
  })

  socket.on('candidate', (data) => {
    //kirim ke peer lain kalau ada
    for(const [socketID, socket] of connectedPeers.entries()){
      //jangan kirimke sendiri
      if(socketID !== data.socketID){
        socket.emit('candidate', data.payload)
      }
    }
  })

  socket.on("needAnswer", function (txt) {
    socket.broadcast.emit("needAnswer", txt);
  });

});

if (app.get("env") === "development") {
  server.listen(PORT, function () {
    console.log(`Now running on PORT ${PORT}`);
  });
}

module.exports = app;
