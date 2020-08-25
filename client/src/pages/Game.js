import React, { createRef, useState, useEffect} from 'react';
import Board from '../components/Board'
import io from "socket.io-client";
import Chat from '../components/Chat/Chat'
import queryString from 'query-string';
import Navbar from '../components/Navbar'

export const Game = ({location}) =>  {
  
  const localVideoref = createRef()
  const remoteVideoRef = createRef()
  let textref = createRef()
  let needAnswer = createRef()
  const { name, room } = queryString.parse(location.search);
  const [username, setUsername] = useState("")

  const socket = io("http://localhost:9002/",{query: {roomName: room}});

  console.log(socket, 'socket')

  const pc_config = {
    iceServers: [
      {
        url: "stun:stun.l.google.com:19302",
      },
      {
        url: "turn:numb.viagenie.ca",
        username: "bimanathanael95@gmail.com",
        credential: "Theendensor@95",
      },
    ],
  };

  useEffect(() => {
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

  }, [location.search]);

  let pc = new RTCPeerConnection(pc_config)

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      // console.log(JSON.stringify(e.candidate))
      sendToPeer('candidate', e.candidate, room)
    }
  };

  pc.oniceconnectionstatechange = (e) => {
    console.log(e);
  };

  pc.ontrack = (e) => {
    remoteVideoRef.current.srcObject = e.streams[0];
  };

  socket.on("connection-success", (success) => {
    console.log(success);
  });

  useEffect(() => {
    // console.log(needAnswer, "needAnswerneedAnswerneedAnswer");

    socket.on("needAnswer", (txt) => {
      needAnswer.current = true;
      if (txt.payload === false) {
        document.getElementById("btn").style.visibility = "hidden";
        document.getElementById("board").style.visibility = "visible";
        console.log("masuk useEffect");
      }
    });

    socket.on(`connection-success`, (option) => {
      console.log('masukconnection-success')
      console.log(option, '<<<option')
      sendToPeer('needAnswer', true )
      pc.createOffer({offerToReceiveVideo: 1, offerToReceiveAudio:1})
      .then( sdp => {
        pc.setLocalDescription(sdp)
        sendToPeer('offerOrAnswer', sdp, room)
      }, e => {})
    })
  }, []);

  // useEffect( () => {
  //   socket.on(`connection-success`, (option) => {
  //     console.log('masukconnection-success')
  //     console.log(option, '<<<option')
  //     sendToPeer('needAnswer', true )
  //     pc.createOffer({offerToReceiveVideo: 1, offerToReceiveAudio:1})
  //     .then( sdp => {
  //       pc.setLocalDescription(sdp)
  //       sendToPeer('offerOrAnswer', sdp, room)
  //     }, e => {})
  //   })
  // },[location.name])

  useEffect( ()=>{
    socket.on('offerOrAnswer', (sdp) => {
      console.log("masuk offer")
      textref.value = JSON.stringify(sdp)
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
    })
    
    socket.on('candidate', (candidate) => {
      console.log("masuk candidate")
      pc.addIceCandidate(new RTCIceCandidate(candidate))

    })
  },[])

  const sendToPeer = (messageType, payload, room) => {
    socket.emit(messageType, {
      socketID: socket.id,
      payload,
      room
    })
  }

 const success = (stream) => {
    window.localStream = stream
    localVideoref.current.srcObject = stream
    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });
  };

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
    if (needAnswer.current != null){
      createAnswer()
      sendToPeer('needAnswer', false, room )
      document.getElementById("btn").style.visibility = "hidden";
      document.getElementById("board").style.visibility = "visible";
    }
  };

  const createAnswer = () => {
    pc.createAnswer({offerToReceiveVideo: 1, offerToReceiveAudio:1})
      .then ( sdp => {
        pc.setLocalDescription(sdp)
        sendToPeer('offerOrAnswer', sdp, room)
      }, e => {})
  }

  return (
    <>
      <Navbar />
      <div className="motherGame">
        {console.log("masuk return")}
        <div className="row">
          <br />
          <div className="flex-column mt-3  mr-3">
            <div>
              <video
                ref={localVideoref}
                autoPlay
                style={{
                  float: "left",
                  width: 240,
                  height: 240,
                  margin: 5,
                  backgroundColor: "black",
                }}
                controls
              ></video>
            </div>

            <div className="text-center">
              {/* <button
                id="btn"
                onClick={() => createOffer()}
                className="btn btn-info  mt-3"
                style={{ width: "100%" }}
              >
                {" "}
                i am ready{" "}
              </button> */}
            </div>
          </div>
          <div className="text-center">
              <button
                id="btn"
                onClick={() => createOffer()}
                className="btn btn-info  mt-3"
                style={{ width: "100%" }}
              >
                {" "}
                i am ready{" "}
              </button>
            {/* <button id="btn" onClick={() => createOffer()} className="btn btn-info  mt-3" style={{width:'100%'}}> i am ready </button> */}
          </div>
        </div>
        {/* <div id="board" style={{visibility: 'hidden'}}> */}
        <div id="board">
          <Board location={location}/>
        </div>
        <div className='d-flex flex-column mt-3 ml-3'>
          <div style={{paddingRight: '19%'}} >
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
          <div className="text-center pt-4">
            <Chat location={location}/>
            {/* <button onClick={() => createAnswer()} className="btn btn-info  mt-3">i am ready</button> */}
          </div>
          <br />
        </div>
        <br></br>
        <br />
        <textarea
          id="myTextArea"
          ref={(ref) => (textref = ref)}
          style={{ display: "none" }}
        ></textarea>
      </div>
      <br></br>
      <br/>
      <input onChange={ (e) => {
        setUsername(e.target.value)
        console.log(username)
        }} value={username} />
      <textarea id="myTextArea" ref={ref => textref = ref} style={{display: "none"}}></textarea>
    </>
  )
  
}

