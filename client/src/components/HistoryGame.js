import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import Cards from "./Cards";
import { Button, Modal, Form, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import io from "socket.io-client";
import { gql, useQuery } from "@apollo/client";
import { GiBattleAxe } from 'react-icons/gi';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { GET_ROOMS, roomsItem } from "../config/client";

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
      let copyData = JSON.parse(JSON.stringify(data));
      return copyData.histories.reverse().slice(0, 4);
    }
  }
  return (
    <>
      <div className="historyMenu">
        <h4 style={{ textAlign: "center", marginTop: "2%" }}>
          Last <b style={{    
            fontSize: '31pt',
            verticalAlign: 'sub',
            color: '#dd4445'
          }}>4</b> Game
        </h4>
        <div className="row">
          
              {data &&
                filterTable().map((result, idx) => (
                  <div key={idx} className="row" style={{
                    width:'100%',
                    backgroundColor: result.score < 0 ? '#a68429' : '#07689f',
                    marginLeft: '7%',
                  }}>
                    <div className="d-flex justify-content-around">
                      <div className="col">
                        <p style={{margin: '7px'}}> 
                        <b style={{fontSize: '16pt'}}>
                          {result.score < 0 ? "Lose" : "Win"}
                        </b>
                        &nbsp; vs &nbsp;{result.opponent} ( {result.score} )</p>
                      </div>
                    </div>
                  </div>
                  // <tr>
                  //   <td>{result.player}</td>
                  //   <td>{result.opponent}</td>
                  //   <td>{result.status}</td>
                  //   <td>{result.score}</td>
                  // </tr>
                ))}
           
        </div>
      </div>
    </>
  );
};
