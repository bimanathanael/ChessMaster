import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Table from "../components/Table";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";

export default () => {
  const history = useHistory();

  const aftermath = require("../asset/aftermath.png");

  const backToMenu = () => {
    history.push("/");
  };

  return (
    <div className="mainMenu">
      <button
        className="btn btn-danger buttonLogout"
        onClick={() => backToMenu()}
      >
        Main Menu
      </button>

      <img
        src={aftermath}
        style={{ margin: "0 auto", width: "5%", height: "10%" }}
      />
      <h1>Leader Board</h1>
      <br />
      <Table />
    </div>
  );
};
