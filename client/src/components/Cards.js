import React from "react";
import { Link, useHistory } from "react-router-dom";

const Card = ({ roomName }) => {
  const kingW = require("../chess-pack/chess-king-white.png");
  const kingB = require("../chess-pack/chess-king-black.png");

  return (
    <div className="col-4">
      <a
        href={`/game?name=${localStorage.getItem("username")}&room=${roomName}`}
      >
        <div className="CardShadow">
          <div className="Card">
            <div className="vs">
              <img className="cardLogo" src={kingW} />
              vs
              <img className="cardLogo" src={kingB} />
            </div>
            <p className="card-title"> Room Name: </p>
            <p className="card-text">{roomName}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
