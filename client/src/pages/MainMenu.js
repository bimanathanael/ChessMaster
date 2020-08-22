import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Cards from "../components/Cards";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";

export default () => {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = () => {
    localStorage.clear();
    swal("you are successfully logout", "", "success");
    history.push("/login");
  };

  return (
    <div className="mainMenu">
      <button
        className="btn btn-danger buttonLogout"
        onClick={(e) => logoutHandler(e)}
      >
        Logout
      </button>
      <h1>Main Menu</h1>
      <div className="buttonGroup">
        <Button variant="primary" onClick={handleShow}>
          Create Room
        </Button>
        <Button variant="primary ToLeaderBoard" onClick={handleShow}>
          Leader Board
        </Button>
        {/* <Link to="/game"> Join game </Link> */}
        <a href="/game"> 
          <button className="btn btn-info"> Join Game </button> 
        </a>
      </div>
      <br />
      <Cards />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Room Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">apalah</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Rating Select</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
