import React, { useState, useEffect } from "react";
import { postRegister } from "../store/actions/userAction";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import swal from "sweetalert";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "./LeaderBoard";

const logo1 = require("../asset/tameng.png");
const logo2 = require("../asset/kudav2.png");
const ADD_USER = gql`
  mutation AddNewUser($newUser: inputNewUser) {
    addUser(user: $newUser) {
      username
      password
    }
  }
`;

export default () => {
  const [mutationAddUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      swal("Success Register!", "", "success");
      history.push("/login");
    },
    onError: () => {
      swal("this username has been registered", "", "error");
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const logo = require("../asset/logo.png");

  const usernameRegisterHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordRegisterHandler = (e) => {
    setPassword(e.target.value);
  };

  const formRegisterHandler = async (e) => {
    e.preventDefault();
    if (!username) {
      swal("username cannot empty", "", "error");
    } else if (!password) {
      swal("password cannot empty", "", "error");
    } else if (username.length < 6) {
      swal("username at least 6 characters", "", "error");
    } else if (password.length < 6) {
      swal("password at least 8 characters", "", "error");
    } else {
      const registerUser = {
        username,
        password,
      };
      console.log(registerUser, "cel");
      mutationAddUser({ variables: { newUser: registerUser } });
    }
  };

  return (
    <div className="motherLogin">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "30%", color: "black" }} className="shadow-lg">
          <Card.Body>
            <div
              style={{
                margin: "3% 7%",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={logo1} style={{ marginBottom: "14%" }} />
                </div>
                <form onSubmit={(e) => formRegisterHandler(e)}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => usernameRegisterHandler(e)}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => passwordRegisterHandler(e)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-info"
                      style={{ width: "100%" }}
                    >
                      Register
                    </button>
                  </div>
                </form>
                <p style={{ marginTop: "10%" }}>
                  Already have account?{" "}
                  <Link to="/login">
                    <Button variant="info">Click Here</Button>
                  </Link>
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
