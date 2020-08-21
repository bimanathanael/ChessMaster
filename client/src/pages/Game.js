import React, { createRef, useState, useEffect} from 'react';
import io from "socket.io-client";
import Board from '../components/board'

const socket = io("http://localhost:3000");

export const Game = () =>  {

  const localVideoref = createRef()
  const remoteVideoRef = createRef()
  let textref = createRef()

  const pc_config = {
    "iceServers": [
      {
        "url" : 'stun:stun.l.google.com:19302'
      },
      {
        "url": "turn:numb.viagenie.ca",
        "username": "bimanathanael95@gmail.com",
        "credential": "Theendensor@95"
      }
    ]
  }

  let pc = new RTCPeerConnection(pc_config)

  pc.onicecandidate = (e) => {
    if(e.candidate) {
      console.log(JSON.stringify(e.candidate))
      sendToPeer('candidate', e.candidate)
    }
  }

  pc.oniceconnectionstatechange = (e) => {
    console.log(e)
  }

  pc.ontrack = (e) => {
    remoteVideoRef.current.srcObject = e.streams[0]
  }

  socket.on("connection-success", success => {
    console.log(success)
  })

  const [teks, setTeks] = useState("");
  useEffect(() => {
    socket.on("move", () => {
    });
    socket.on("teks", (txt) => {
      setTeks(txt);
    });
  
    socket.on('offerOrAnswer', (sdp) => {
      textref.value = JSON.stringify(sdp)
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
    })

    socket.on('candidate', (candidate) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate))

    })
  }, []);
  
  const formHandler = (e) => {
    console.log(e.target.value);
    setTeks(e.target.value);
    socket.emit("teks", e.target.value);
  };

  const sendToPeer = (messageType, payload) => {
    socket.emit(messageType, {
      socketID: socket.id,
      payload
    })
  }

 const success = (stream) => {
    window.localStream = stream
    localVideoref.current.srcObject = stream
    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });
  }

  const failure = (e) => {
    console.log('getUserMedia Error: ', e)
  }

  const constraints = { video : true, audio:true}
  navigator.mediaDevices.getUserMedia( constraints)
  .then( success )
  .catch( failure )

  const createOffer = () => {
    console.log('offer')
    pc.createOffer({offerToReceiveVideo: 1, offerToReceiveAudio:1})
    .then( sdp => {
      pc.setLocalDescription(sdp)
      sendToPeer('offerOrAnswer', sdp)
    }, e => {})
  }

  const createAnswer = () => {
    pc.createAnswer({offerToReceiveAudio: 1})
      .then ( sdp => {
        pc.setLocalDescription(sdp)
        sendToPeer('offerOrAnswer', sdp)
      }, e => {})
  }

  return (
    <div className="motherLogin">
      <div className="row">
        <br />
            <input
              onChange={(e) => formHandler(e)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={teks}
            />
        <video 
          ref={localVideoref} 
          autoPlay
          style={{
            float:"left",
            width: 240, 
            height: 240, 
            margin: 5, 
            backgroundColor :'black'
          }}
          controls
          >
        </video>
        <Board/>
        <video 
          ref={remoteVideoRef} 
          autoPlay
          style={{
            float:"right",
            width: 240, 
            height: 240, 
            margin: 5, 
            backgroundColor :'black'
          }}
          controls
          >
        </video>
        <br/>
      </div>
      <br></br>
      <button onClick={() => createOffer()}>Offer</button>
      <button onClick={() => createAnswer()}>Answer</button>
      <br/>
      <textarea id="myTextArea" ref={ref => textref = ref} style={{display: "none"}}></textarea>
    </div>
  )
  
}
