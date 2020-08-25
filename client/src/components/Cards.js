import React from "react";
import { Link, useHistory } from "react-router-dom";

const Card = ({ roomName }) => {
  const kingW = require("../chess-pack/chess-king-white.png");
  const kingB = require("../chess-pack/chess-king-black.png");

  return (
    <div className="col-4">
      <div className="Card">
        <div className="vs">
          <img className="cardLogo" src={kingW} />
          vs
          <img className="cardLogo" src={kingB} />
        </div>
        <p> {roomName} </p>
        <a href={`/game?name=${localStorage.getItem('username')}&room=${roomName}`}> 
          <button className="btn btn-info"> Join Game </button> 
        </a>
      </div>
    </div>
    
  );
};

export default Card;
