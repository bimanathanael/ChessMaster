import React from "react";
import { Navbar, Button, Nav, NavDropdown, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import swal from "sweetalert";
import Table from "./Table";

export const GET_USERS = gql`
  query {
    users {
      _id
      username
      score
    }
  }
`;

export default () => {
  const Gold = require("../asset/goldmedal.png");
  const Silver = require("../asset/silvermedal.png");
  const Bronze = require("../asset/bronzemedal.png");
  const history = useHistory();

  const logo = require("../asset/logo.png");
  let { error, loading, data: dataLeaderboard } = useQuery(GET_USERS);

  const aftermath = require("../asset/aftermath.png");

  let winner = [];
  const filterDataLeaderboard = () => {
    if (dataLeaderboard) {
      let dataFromDB = JSON.parse(JSON.stringify(dataLeaderboard));
      console.log(dataLeaderboard.users, "cek");
      let flag = true;
      while (flag === true) {
        flag = false;
        for (let i = 0; i < dataFromDB.users.length - 1; i++) {
          if (dataFromDB.users[i + 1].score > dataFromDB.users[i].score) {
            flag = true;
            let swap = dataFromDB.users[i + 1];
            dataFromDB.users[i + 1] = dataFromDB.users[i];
            dataFromDB.users[i] = swap;
          }
        }
      }
      winner = dataFromDB.users.slice(0, 5);
    }
  };

  filterDataLeaderboard();

  const logoutHandler = () => {
    localStorage.clear();
    swal("you are successfully logout", "", "success");
    history.push("/login");
  };

  const goToHome = () => {
    history.push("/");
  };

  return (
    <nav
      className="d-flex justify-content-around"
      style={{
        backgroundColor: "#316a5d",
        borderBottom: "3px solid ghostwhite",
        width: "100%",
      }}
    >
      {dataLeaderboard && (
        <>
          {console.log(winner)}
          <div className="col-3">
            <div
              className="card mb-3 p-3"
              style={{ height: "67%", marginTop: "8%" }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={Gold}
                    className="card-img"
                    style={{
                      marginLeft: "13%",
                      marginTop: "16%",
                      height: "64%",
                      width: "67%",
                    }}
                  />
                </div>
                <div className="col-md-8 pt-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>#1</b> {winner[0].username}
                      <br /> Score: <b>{winner[0].score}</b>{" "}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div
              className="card mb-3 p-3"
              style={{ height: "67%", marginTop: "8%" }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={Silver}
                    className="card-img"
                    style={{
                      marginLeft: "13%",
                      marginTop: "16%",
                      height: "64%",
                      width: "67%",
                    }}
                  />
                </div>
                <div className="col-md-8 pt-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>#2</b> {winner[1].username}
                      <br /> Score: <b>{winner[1].score}</b>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div
              className="card mb-3 p-3"
              style={{ height: "67%", marginTop: "8%" }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={Bronze}
                    className="card-img"
                    style={{
                      marginLeft: "13%",
                      marginTop: "16%",
                      height: "64%",
                      width: "67%",
                    }}
                  />
                </div>
                <div className="col-md-8 pt-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>#3</b> {winner[2].username}
                      <br /> Score: <b>{winner[2].score}</b>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
