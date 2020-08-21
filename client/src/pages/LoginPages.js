import React, { useState } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { postLogin } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const logo = require("../chess-pack/chess-king-white.png");

  const usernameLoginHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordLoginHandler = (e) => {
    setPassword(e.target.value);
  };

  const formLoginHandler = (e) => {
    e.preventDefault();
    const loginUser = {
      username,
      password,
    };
    dispatch(postLogin(loginUser, history));
  };

  return (
    <>
      <div style={{ backgroundColor: "#263554" }}>
        <div
          className="text-center"
          style={{ paddingTop: "2%", color: "white" }}
        >
          <img
            className="LogoLogin"
            src={logo}
            style={{
              width: "15%",
            }}
          />
          <h1 className="Login-Title">Welcome TO ChessMaster</h1>
        </div>
        <br />
        <div style={{ margin: "0 31%", color: "white", paddingBottom: "2.4%" }}>
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
            Already have account ? <Link to="/register">click here</Link>
          </p>
        </div>
      </div>
    </>
  );
};
