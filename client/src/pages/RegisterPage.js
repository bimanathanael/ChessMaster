import React, { useState, useEffect } from "react";
import { postRegister } from "../store/actions/userAction";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const logo = require("../chess-pack/chess-pawn-black.png");

  const usernameRegisterHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordRegisterHandler = (e) => {
    setPassword(e.target.value);
  };

  const formRegisterHandler = async (e) => {
    e.preventDefault();
    const registerUser = {
      username,
      password,
    };
    const asda = await dispatch(postRegister(registerUser, history));
    console.log(asda, "ini undefined");
  };

  return (
    <div className="motherLogin">
      <div style={{ backgroundColor: "#263554" }}>
        <div className="text-center" style={{ color: "white" }}>
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
            Already have account ?{" "}
            <Link to="/login">
              <Button variant="info">Click Here</Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
