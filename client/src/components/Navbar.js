import React from "react";
import { Navbar, Button, Nav, NavDropdown, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";

export default () => {
  const history = useHistory();

  const logo = require("../asset/logo.png");

  const logoutHandler = () => {
    localStorage.clear();
    swal("you are successfully logout", "", "success");
    history.push("/login");
  };

  const goToHome = () => {
    history.push("/");
  };

  return (
    <nav className="d-flex justify-content-center" style={{ backgroundColor: '#316a5d', borderBottom: '3px solid ghostwhite'}}>
      <div className="row-3" style={{marginTop: '1.5%'}}>
        <a href={`/${localStorage.getItem('username')}`}>
          <button className="btn btn-info" style={{boxShadow: '2px 3px 5px 0px rgba(0,0,0,0.75)'}}>
            Home
          </button>
        </a>
      </div>
      <div className="row-3" style={{
        backgroundColor: 'white', 
        borderRadius: '44px', 
        margin: '11px', 
        marginRight: '15px', 
        marginLeft: '15px', 
      }} >
        <a href="/">
          <img src={logo} style={{ width: "100px" }} />
        </a>
      </div>
      <div className="row-3" style={{marginTop: '1.5%'}}>
        <Button variant="danger" onClick={(e) => logoutHandler(e)} style={{boxShadow: '2px 3px 5px 0px rgba(0,0,0,0.75)'}}>
          Logout
        </Button>
      </div>
    </nav>
  );
};
