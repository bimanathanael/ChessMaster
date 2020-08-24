import React from "react";
import { Navbar, Button, Nav, NavDropdown, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";

export default () => {
  const history = useHistory();

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
      <Navbar.Brand>Chess Master</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={(e) => goToHome(e)}>Home</Nav.Link>
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
