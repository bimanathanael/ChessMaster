import React, { useState } from "react";
// import { gql, useMutation } from "@apollo/client";
// import { GET_MOVIES } from "./Movies";
import { useHistory, useRouteMatch } from "react-router-dom";

export default () => {
  const history = useHistory();

  const logo = require("../chess-pack/chess-pawn-black.png");

  //   const onchange = (e) => {
  //     let { name, value } = e.target;
  //     const newMoviesInput = { ...MoviesInput, [name]: value };
  //     setMovieInput(newMoviesInput);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     MoviesInput.popularity = Number(MoviesInput.popularity);
  //     addMovies({
  //       variables: {
  //         addNewMovies: MoviesInput,
  //       },
  //     });
  //     history.push("/main-menu");
  //   };

  return (
    <div className="motherLogin">
      <div>
        <img src={logo} />
        <h1>Welcome TO ChessMater</h1>
        <h2>Please Fill The Form Below To REGISTER</h2>
        <br />

        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">User Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Register
          </button>
        </form>
        <p>Allready Have Account ? Login down Here !!</p>
        <button type="submit" className="btn btn-primary" value="save">
          Login
        </button>
      </div>
    </div>
  );
};
