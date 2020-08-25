import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import Cards from "../components/Cards";
import { Button, Modal, Form, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import io from "socket.io-client";
import { gql, useQuery } from "@apollo/client";
import { GET_ROOMS, roomsItem } from "../config/client";
import Navbar from "../components/Navbar";

export const GET_HISTORYGAME = gql`
  query GetHistory($getHistory: String) {
    histories(player: $getHistory) {
      id
      player
      opponent
      status
      score
    }
  }
`;

export default () => {
  const { username } = useParams();
  const { error, loading, data } = useQuery(GET_HISTORYGAME, {
    variables: { getHistory: username },
  });

  function filterTable() {
    if (data) {
      return data.histories.slice(data.length - 8);
    }
  }
  return (
    <>
      <Navbar />

      <h4 style={{ textAlign: "center", marginTop: "2%" }}>
        Your Last 4 Game History
      </h4>
      <div className="historyGame ">
        <Table
          bordered
          hover
          className="shadow-lg"
          style={{ width: "50%", backgroundColor: "white" }}
        >
          <thead>
            <tr>
              <th>Player</th>
              <th>Opponent</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              filterTable().map((result, idx) => (
                <tr>
                  <td>{result.player}</td>
                  <td>{result.opponent}</td>
                  <td>{result.status}</td>
                  <td>{result.score}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
