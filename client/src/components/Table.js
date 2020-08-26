import React from "react";
import { Table } from "react-bootstrap";

export default ({ data, idx }) => {
  const Gold = require("../asset/gold.png");
  const Silver = require("../asset/silver.png");
  const Bronze = require("../asset/bronze.png");
  const listTrophy = [Gold, Silver, Bronze];

  return (
    <div style={{ margin: "0 30%", paddingTop: "2.4%" }}>
      <Table striped bordered hover variant="light">
        <thead variant="dark">
          <tr>
            <th>No</th>
            <th>Thropy</th>
            <th>UserName</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dataLeaderboard, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                {idx > 2 ? (
                  <p></p>
                ) : (
                  <img src={listTrophy[idx]} width="20px" height="20px" />
                )}
              </td>
              <td>{dataLeaderboard.username}</td>
              <td>{dataLeaderboard.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
