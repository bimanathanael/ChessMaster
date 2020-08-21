import React from "react";
import { Table } from "react-bootstrap";

export default () => {
  const Gold = require("../asset/gold.png");
  const Silver = require("../asset/silver.png");
  const Bronze = require("../asset/bronze.png");

  return (
    <div style={{ margin: "0 30%", paddingTop: "2.4%" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img className="trophy" src={Gold} />
            </td>
            <td>Mark</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>
              <img className="trophy" src={Silver} />
            </td>
            <td>Jacob</td>
            <td>750</td>
          </tr>
          <tr>
            <td>
              <img className="trophy" src={Bronze} />
            </td>
            <td>Larry the Bird</td>
            <td>500</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
