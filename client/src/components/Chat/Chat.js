import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import onlineIcon from '../../icons/onlineIcon.png';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:9004/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <div className="infoBar">
          <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h5>{room}</h5>
          </div>
        </div>
        {/* <div> */}
          <ScrollToBottom className="messages">
            {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
          </ScrollToBottom>
        {/* </div> */}
        {/* <Messages messages={messages} name={name} /> */}
        <div>
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
          </form>
        </div>
          {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </div>
    </div>
  );
}

export default Chat;
