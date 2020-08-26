import React, { createRef, useState, useEffect} from 'react';
import Board from '../components/Board'
import io from "socket.io-client";
import Chat from '../components/Chat/Chat'
import queryString from 'query-string';
import Navbar from '../components/Navbar'
import { CgArrowUpR, CgArrowDownR } from 'react-icons/cg';
import { GiCrossedSwords } from 'react-icons/gi';


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
        document.getElementById("btn").style.display = "none";
        document.getElementById("board").style.visibility = "visible";
        document.getElementById("versus").style.display = "none";
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
      document.getElementById("btn").style.display = "none";
      document.getElementById("board").style.visibility = "visible";
      document.getElementById("versus").style.display = "initial";

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
        <div className='row' style={{width: '100%'}}>
          <div class="col-3 offset-1 mr-4">
            <br />
            <div className="flex-column mr-3">
              <div className="row  mb-3">
                <button
                  id="btn"
                  onClick={() => createOffer()}
                  className="btn btn-info"
                  style={{ width: "100%" }}
                >
                  I am ready 
                </button>
              </div>
              <div className="row">
                <video
                  ref={localVideoref}
                  autoPlay
                  className="video"
                  controls
                ></video>
              </div>
              <div className="text-center mt-3">
                <div id="versus" className="row versus d-flex justify-content-around p-2" >
                  <div>
                    <CgArrowUpR style={{ marginBottom: '8%'}}/> You
                  </div>
                  <div>
                    <GiCrossedSwords/>
                  </div>
                  <div>
                    Opponent <CgArrowDownR style={{ marginBottom: '4%'}}/>
                  </div>
                  {/* <p style={{marginTop: '10px'}}> <CgArrowUpR/> You VS Opponent <CgArrowDownR/></p> */}
                </div>
              </div>
              <div className="row mt-3">
                <video 
                  ref={remoteVideoRef} 
                  autoPlay
                  className="video"
                  controls
                  >
                </video>
              </div>
            </div>
          </div>
          {/* <div id="board" style={{visibility: 'hidden'}}> */}
          <div className="col mt-5" id="board" >
            <Board location={location}/>
          </div>
          <div class="col-3 mt-4 mr-3 ml-4">
            <Chat location={location}/>
          </div>
          <div className='col'>
          </div>
          <textarea
            id="myTextArea"
            ref={(ref) => (textref = ref)}
            style={{ display: "none" }}
          ></textarea>
        </div>

      </div>
      <textarea id="myTextArea" ref={ref => textref = ref} style={{display: "none"}}></textarea>
    </>
  )
  
}

