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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <a href="/">
          <img src={logo} style={{ width: "100px" }} />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <a href="/">
            Home
            {/* <Nav.Link>Home</Nav.Link> */}
          </a>
        </Nav>
        <Form inline>
          <Button variant="danger" onClick={(e) => logoutHandler(e)}>
            Logout
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
