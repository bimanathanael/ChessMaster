import React, { useState } from "react";
// import { gql, useMutation } from "@apollo/client";
// import { GET_MOVIES } from "./Movies";
import { useHistory, useRouteMatch } from "react-router-dom";

export default () => {
  const history = useHistory();

  const logo = require("../chess-pack/chess-king-white.png");

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
        <img className="LogoLogin" src={logo} />
        <h1 className="Login-Title">Welcome TO ChessMater</h1>
        <br />

        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
            Submit
          </button>
        </form>
        <p>Dont have account ye ? Register down Here !!</p>
        <button type="submit" className="btn btn-primary" value="save">
          Submit
        </button>
      </div>
    </div>
  );
};
