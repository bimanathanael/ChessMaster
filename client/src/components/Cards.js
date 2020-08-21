import React from "react";
import { Link, useHistory } from "react-router-dom";

const Card = ({ data }) => {
  const kingW = require("../chess-pack/chess-king-white.png");
  const kingB = require("../chess-pack/chess-king-black.png");

  console.log(data);
  return (
    <div className="Card">
      <div className="vs">
        <img className="cardLogo" src={kingW} />
        vs
        <img className="cardLogo" src={kingB} />
      </div>
    </div>
    // <Link
    //   to={{
    //     pathname: ">>> game room",
    //     //   data.__typename === "Movies"
    //     //     ? `/movies/${data._id}`
    //     //     : `/series/${data._id} `,
    //   }}
    // >
    //   <div className="Card">
    //     <p>
    //       {" "}
    //       <img src={kingW} /> VS <img src={kingB} />{" "}
    //     </p>
    //   </div>
    // </Link>
  );
};

export default Card;
