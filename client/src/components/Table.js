import React from "react";
import { Table } from "react-bootstrap";

export default ({ data, idx }) => {
  const Gold = require("../asset/gold.png");
  const Silver = require("../asset/silver.png");
  const Bronze = require("../asset/bronze.png");

  function filterData() {
    return data.slice(3);
  }

  return (
    <div style={{ margin: "0 30%", paddingTop: "2.4%" }}>
      <Table striped bordered hover variant="light">
        <thead variant="dark">
          <tr>
            <th>Position</th>
            <th>UserName</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filterData().map((dataLeaderboard, idx) => (
            <tr key={idx}>
              <td>{idx + 4}</td>
              <td>{dataLeaderboard.username}</td>
              <td>{dataLeaderboard.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
