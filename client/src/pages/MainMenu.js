import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Cards from "../components/Cards";
import { Button, Modal, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default () => {
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [rangedScore, setRangedScore] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const { listRoom, userLogin } = useSelector((state) => state);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const logoutHandler = () => {
    localStorage.clear();
    swal("you are successfully logout", "", "success");
    history.push("/login");
  };

  const formRoomNameHandler = (e) => {
    setRoomName(e.target.value);
  };

  const formRangedScoreHandler = (e) => {
    setRangedScore(e.target.value);
  };

  const submitFormRoomHandler = (e) => {
    e.preventDefault();
    const userScore = Number(localStorage.getItem("score"));
    const checkRangedScore = rangedScore.split("-");
    if (Number(checkRangedScore[0]) > userScore) {
      swal(`your score is smaller than ${checkRangedScore[0]}!`, "", "error");
    } else if (Number(checkRangedScore[1]) < userScore) {
      swal(`your score is greater than ${checkRangedScore[1]}!`, "", "error");
    } else if (!roomName) {
      swal("name room cannot empty!", "", "error");
    } else {
      const setData = {
        roomName,
        rangedScore,
        ownerRoom: localStorage.getItem("username"),
      };
      dispatch({
        type: "SET_ROOM_GAME",
        payload: setData,
      });
      console.log(setData, "cek mamang");
      swal("success create room", "", "success");
      setShow(false);
      setRoomName("");
    }
  };

  const goToRoom = () => {
    history.push("/hahah");
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
        <Link to="/leaderboard">
          <Button variant="primary" style={{ marginRight: "20px" }}>
            Leader Board
          </Button>
        </Link>
        <a href="/game">
          <button className="btn btn-info"> Join Game </button>
        </a>
      </div>
      <div style={{ padding: "2%", width: "20%" }} className="border">
        <p>Hello: {localStorage.getItem("username")}</p>
        <p>Your Score: {localStorage.getItem("score")}</p>
      </div>
      <br />
      <Button variant="primary" onClick={handleShow}>
        Create Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Add room</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => submitFormRoomHandler(e)}>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                onChange={(e) => formRoomNameHandler(e)}
                type="text"
                placeholder="Room Name.."
                value={roomName}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Ranged Score</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => formRangedScoreHandler(e)}
              >
                <option value="" selected disabled hidden>
                  choose here ....
                </option>
                <option value="0-100">0-100</option>
                <option value="101-200">101-200</option>
                <option value="201-300">201-300</option>
                <option value="301-999">301-999</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Create Room
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <h2 style={{ marginTop: "50px" }}>Avalaible Room:</h2>
      {listRoom.length === 0 && <h2>Tidak ada room yang tersedia</h2>}
      <div className="container">
        <div className="row">
          {listRoom.map((data, idx) => (
            // <div onClick={(e) => goToRoom(e)}>
            <Card bg="info" className="col-sm-2">
              <Card.Header>{data.roomName}</Card.Header>
              <Card.Body>
                <Card.Title>{data.rangedScore} </Card.Title>
                <Card.Title>Created By: {data.ownerRoom} </Card.Title>
                <Button variant="secondary">Join</Button>
              </Card.Body>
            </Card>
            // </div>
          ))}
        </div>
      </div>

      {/* <Cards /> */}
    </div>
  );
};
