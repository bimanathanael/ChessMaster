import swal from "sweetalert";
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
        if (result.message === "success register") {
          swal(result.message, "", "success");
          history.push("/login");
        } else if (result.message === "username cannot empty") {
          swal(result.message, "", "error");
        } else if (result.message === "password cannot empty") {
          swal(result.message, "", "error");
        } else if (result.message === "this username has been registered") {
          swal(result.message, "", "error");
        } else if (result.message === "username at least 6 characters") {
          swal(result.message, "", "error");
        } else if (result.message === "password at least 8 characters") {
          swal(result.message, "", "error");
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
        if (result.access_token) {
          swal("success login", "", "success");
          localStorage.setItem("access_token", result.access_token);
          history.push("/");
        } else if (result.message === "user not found") {
          swal(result.message, "", "error");
        } else if (result.message === "wrong password") {
          swal(result.message, "", "error");
        }
      })
      .catch((err) => console.log(err, "ini error"));
  };
};
