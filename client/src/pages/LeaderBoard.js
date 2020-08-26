import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Table from "../components/Table";
import { Button, Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { getLeaderboard } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import Navbar from '../components/Navbar'

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
      <Navbar/>
      <div className="mainMenu">
      <img
        className="mt-3"
        src={aftermath}
        style={{ 
          margin: "0 auto", 
          width: "5%", 
          height: "10%",
          backgroundColor: 'white',
          padding: '5px',
          borderRadius: '6px', }}
      />
      <div>
        <h1>Leader Board</h1>
      </div>
        <br />
        {dataLeaderboard && <Table data={filterDataLeaderboard()} />}
      </div>
    </>
  );
};
