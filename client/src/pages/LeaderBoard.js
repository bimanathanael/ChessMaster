import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Table from "../components/Table";
import { Button, Modal, Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { getLeaderboard } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import Navbar from "../components/Navbar";

const goldMedal = require("../asset/goldmedal.png");
const silverMedal = require("../asset/silvermedal.png");
const bronzeMedal = require("../asset/bronzemedal.png");

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
  let { error, loading, data: dataLeaderboard } = useQuery(GET_USERS);
  const history = useHistory();

  const aftermath = require("../asset/aftermath.png");

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
      return dataFromDB.users.slice(0, 5);
    }
  };

  const backToMenu = () => {
    history.push("/");
  };

  if (error) {
    return (
      <>
        <h3>404 Not Found</h3>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <Spinner animation="border" variant="warning" />
        <br />
        <p>loading</p>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="mainMenu2">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginTop: "5%", marginRight: "2%", color: "black" }}>
            <Card style={{ width: "18rem" }} className="shadow-lg">
              <Card.Img
                src={silverMedal}
                style={{
                  width: "50%",
                  display: "flex",
                  alignSelf: "center",
                }}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{filterDataLeaderboard()[1].username}</Card.Title>
                <Card.Text>{filterDataLeaderboard()[1].score}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div style={{ marginRight: "2%", color: "black" }}>
            <Card style={{ width: "18rem" }} className="shadow-lg">
              <Card.Img
                src={goldMedal}
                style={{
                  width: "50%",
                  display: "flex",
                  alignSelf: "center",
                }}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{filterDataLeaderboard()[0].username}</Card.Title>
                <Card.Text>{filterDataLeaderboard()[0].score}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div style={{ marginTop: "5%", color: "black" }}>
            <Card style={{ width: "18rem" }} className="shadow-lg">
              <Card.Img
                src={bronzeMedal}
                style={{
                  width: "50%",
                  display: "flex",
                  alignSelf: "center",
                }}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{filterDataLeaderboard()[2].username}</Card.Title>
                <Card.Text>{filterDataLeaderboard()[2].score}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <br />
        {dataLeaderboard && <Table data={filterDataLeaderboard()} />}
      </div>
    </>
  );
};
