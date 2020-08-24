import swal from "sweetalert";
const jwt = require("jsonwebtoken");
const TOKEN_KEY = "chessMaster";
const jwtVerify = (data) => {
  var decoded = jwt.verify(data, TOKEN_KEY);
  return decoded;
};

export const postRegister = (data, history) => {
  return (dispatch) => {
    fetch("http://localhost:9000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.message === "username cannot empty") {
          swal(result.message, "", "error");
        } else if (result.message === "password cannot empty") {
          swal(result.message, "", "error");
        } else if (result.message === "this username has been registered") {
          swal(result.message, "", "error");
        } else if (result.message === "username at least 6 characters") {
          swal(result.message, "", "error");
        } else if (result.message === "password at least 8 characters") {
          swal(result.message, "", "error");
        } else {
          swal("success register", "", "success");
          history.push("/login");
        }
      })
      .catch((err) => console.log(err, "ini error"));
  };
};

export const postLogin = (data, history) => {
  return (dispatch) => {
    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((result) => {
        let data = jwtVerify(result.access_token, TOKEN_KEY);
        localStorage.setItem("username", data.username);
        localStorage.setItem("score", data.score);
        if (result.access_token) {
          swal("success login", "", "success");
          localStorage.setItem("access_token", result.access_token);
          history.push("/");
        } else if (result.message === "Wrong username/password") {
          swal(result.message, "", "error");
        }
      })
      .catch((err) => console.log(err, "ini error"));
  };
};

export const updateScore = (data) => {
  console.log(data, "cek data");
  return (dispatch) => {
    fetch("http://localhost:9000/users", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log("masuk action atau tidak?", result);
        dispatch({
          type: "UPDATE_LEADERBOARD",
          payload: result,
        });
      })
      .catch((err) => console.log(err, "ini error"));
  };
};

export const getLeaderboard = (data) => {
  return (dispatch) => {
    fetch("http://localhost:9000/users")
      .then((resp) => resp.json())
      .then((result) => {
        dispatch({
          type: "DATA_LEADERBOARD",
          payload: result,
        });
      })
      .catch((err) => console.log(err, "ini error"));
  };
};
