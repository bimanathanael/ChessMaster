import React from "react";
import { useHistory, Link } from "react-router-dom";
import Cards from "../components/Cards";

export default () => {
  const history = useHistory();

  const kingW = require("../chess-pack/chess-king-white.png");
  const kingB = require("../chess-pack/chess-king-black.png");

  return (
    <div className="mainMenu">
      <button className="btn btn-danger buttonLogout">Logout</button>
      <h1>Main Menu</h1>
      <div className="buttonGroup">
        <button className="btn btn-primary buttoncreate" type="button">
          Create Room
        </button>
        <button className="btn btn-primary ToLeaderBoard" type="button">
          Leader Board
        </button>
      </div>
      <br />
      <Cards />
    </div>
  );
};
