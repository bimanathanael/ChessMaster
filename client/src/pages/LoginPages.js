import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { postLogin } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import swal from "sweetalert";
const jwt = require("jsonwebtoken");
const TOKEN_KEY = "chessMaster";
const jwtVerify = (data) => {
  var decoded = jwt.verify(data, TOKEN_KEY);
  return decoded;
};

const LOGIN_USER = gql`
  mutation LoginUser($userLogin: inputLoginUser) {
    loginUser(user: $userLogin) {
      access_token
    }
  }
`;
export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [mutationLoginUser, { error, data }] = useMutation(LOGIN_USER, {
    onError: () => {
      swal("wrong username/password", "", "error");
    },
  });

  useEffect(() => {
    if (data) {
      let access_token = data.loginUser.access_token;
      localStorage.setItem("access_token", access_token);
      const dataFromJWT = jwtVerify(access_token, TOKEN_KEY);
      localStorage.setItem("username", dataFromJWT.username);
      localStorage.setItem("score", dataFromJWT.score);
      history.push("/");
      swal("success login", "", "success");
    }
  }, [data]);

  const logo = require("../asset/logo.png");

  const usernameLoginHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordLoginHandler = (e) => {
    setPassword(e.target.value);
  };

  const formLoginHandler = async (e) => {
    e.preventDefault();
    const dataUser = {
      username,
      password,
    };

    mutationLoginUser({ variables: { userLogin: dataUser } });
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
                  <img src={logo} style={{ marginBottom: "14%" }} />
                </div>
                <form onSubmit={(e) => formLoginHandler(e)}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => usernameLoginHandler(e)}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => passwordLoginHandler(e)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-info"
                      style={{ width: "100%" }}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p style={{ marginTop: "10%" }}>
                  Don't have an account?{" "}
                  <Link to="/register">
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
