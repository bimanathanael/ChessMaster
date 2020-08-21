const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const server = require("http").createServer();
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

let connectedPeers = new Map()

io.on("connection", (socket) => {
  socket.emit('connection-success', {success: `/webrtcPeer#${socket.id}`})

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
