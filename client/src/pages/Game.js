import React, { createRef, useState, useEffect} from 'react';
import io from "socket.io-client";
import Board from '../components/board'
import {socket} from '../config/socket'

export const Game = () =>  {

  const localVideoref = createRef()
  const remoteVideoRef = createRef()
  let textref = createRef()
  let needAnswer = createRef()


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
      // console.log(JSON.stringify(e.candidate))
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

    socket.on("teks", (txt) => {
      setTeks(txt);
    });

    console.log(needAnswer, 'needAnswerneedAnswerneedAnswer')
    socket.on("needAnswer", (txt) => {
      needAnswer.current = true;
      if(txt.payload === false ){
        document.getElementById("btn").style.visibility = "hidden";
        document.getElementById("board").style.visibility = "visible";
      }
    });

    socket.on('connection-success', () => {
      console.log('masuk')
      sendToPeer('needAnswer', true )
      pc.createOffer({offerToReceiveVideo: 1, offerToReceiveAudio:1})
      .then( sdp => {
        pc.setLocalDescription(sdp)
        sendToPeer('offerOrAnswer', sdp)
      }, e => {})
    })
  
    socket.on('offerOrAnswer', (sdp) => {
      textref.value = JSON.stringify(sdp)
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
    })

    socket.on('candidate', (candidate) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate))

    })
  }, []);

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
    const btn = document.getElementById('btn');
    btn.disabled = true; 
    btn.innerText = 'Waiting for Opponent...'
    if (needAnswer.current == null){
      
    } else {
      createAnswer()
      sendToPeer('needAnswer', false )
      document.getElementById("btn").style.visibility = "hidden";
      document.getElementById("board").style.visibility = "visible";

    }
  }

  const createAnswer = () => {
    pc.createAnswer({offerToReceiveVideo: 1, offerToReceiveAudio:1})
      .then ( sdp => {
        pc.setLocalDescription(sdp)
        sendToPeer('offerOrAnswer', sdp)
      }, e => {})
  }

  return (
    <div className="motherLogin">
      <div className="row">
        <br />
        <div className='flex-column mt-3  mr-3'>
          <div>
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
          </div>
          <div className="text-center">
            <button id="btn" onClick={() => createOffer()} className="btn btn-info  mt-3" style={{width:'100%'}}> i am ready </button>
          </div>
        </div>
        <div id="board" style={{visibility: 'hidden'}}>
          <Board/>
          {/* <h1>
            hello
          </h1> */}
        </div>
        <div className='flex-column mt-3 ml-3'>
          <div>
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
          </div>
          <div className="text-center">
            {/* <button onClick={() => createAnswer()} className="btn btn-info  mt-3">i am ready</button> */}
          </div>
        </div>
        <br/>
      </div>
      <br></br>
      <br/>
      <textarea id="myTextArea" ref={ref => textref = ref} style={{display: "none"}}></textarea>
    </div>
  )
  
}

