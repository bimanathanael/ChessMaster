import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Cards from "../components/Cards";
import { Button, Modal, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import io from "socket.io-client";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_ROOMS, roomsItem } from "../config/client";
import Navbar from "../components/Navbar";

const ENDPOINT = "http://localhost:9004/";

export const GET_USERBYID = gql`
  query GetById($dataUser: String) {
    user(username: $dataUser) {
      _id
      username
      score
    }
  }
`;

const ADD_TO_HISTORYGAME = gql`
  mutation AddToHistory($addHistoryGame: inputNewHistory) {
    addHistory(history: $addHistoryGame) {
      player
      opponent
      status
      score
    }
  }
`;

export default () => {
  let socket = io(ENDPOINT);
  const { data: dataRooms } = useQuery(GET_ROOMS);
  const { error, loading, data: dataFromApollo } = useQuery(GET_USERBYID, {
    variables: { dataUser: localStorage.getItem("username") },
  });
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [timer, setTimer] = useState(0);
  const [rangedScore, setRangedScore] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const { listRoom, userLogin } = useSelector((state) => state);

  const [room, setRoom] = useState("");
  const [allRooms, setAllRooms] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const formRoomNameHandler = (e) => {
    setRoomName(e.target.value);
  };

  const formRangedScoreHandler = (e) => {
    setRangedScore(e.target.value);
  };

  const formTimerHandler = (e) => {
    setTimer(e.target.value);
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
      const currentRooms = roomsItem();
      // console.log("asdasd");
      // console.log(currentRooms, "paling baru");
      // console.log(
      //   roomName,
      //   timer,
      //   rangedScore,
      //   localStorage.getItem("username")
      // );
      const setData = {
        roomName,
        timer,
        rangedScore,
        ownerRoom: localStorage.getItem("username"),
      };
      socket.emit("newRoom", setData.roomName);

      // console.log(setData, "ini data");
      // roomsItem(currentRooms.concat(setData));
      // console.log(currentRooms, "cek");

      // dispatch({ type: "SET_ROOM_GAME", payload: setData });

      // console.log(setData, "cek mamang");
      swal("success create room", "", "success");
      setShow(false);
      setRoomName("");
    }
  };

  // const doCreateRoom = (e) => {
  //   e.preventDefault()
  //   socket.emit('newRoom', room)
  // }

  const moveToDetailUser = () => {
    history.push(`/users/${localStorage.getItem("username")}`);
  };

  useEffect(() => {
    socket.on("allRooms", (rooms) => {
      setAllRooms(rooms);
    });
    socket.emit("getRooms", () => {});
  }, []);

  // console.log(allRooms, 'allRooms')
  return (
    <div>
      <Navbar />
      <div className="mainMenu">
        <h1>Main Menu</h1>

        <div className="buttonGroup">
          <Link to="/leaderboard">
            <Button variant="primary" style={{ marginRight: "20px" }}>
              Leader Board
            </Button>
          </Link>
          {/* <a href="/game">
            <button className="btn btn-info"> Join Game </button>
          </a> */}
        </div>
        <div
          onClick={(e) => moveToDetailUser(e)}
          style={{ cursor: "pointer", width: "20%" }}
        >
          {dataFromApollo && (
            <div style={{ padding: "2%" }} className="border">
              <p>Hello: {dataFromApollo.user.username}</p>
              <p>Your Score: {dataFromApollo.user.score}</p>
            </div>
          )}
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
                <Form.Label>Time</Form.Label>
                <Form.Control as="select" onChange={(e) => formTimerHandler(e)}>
                  <option value="" selected disabled hidden>
                    choose here ....
                  </option>
                  <option value="60">1 Minutes</option>
                  <option value="120">2 Minutes</option>
                  <option value="180">3 Minutes</option>
                  <option value="240">4 Minutes</option>
                  <option value="300">5 Minutes</option>
                  <option value="360">6 Minutes</option>
                  <option value="420">7 Minutes</option>
                  <option value="480">8 Minutes</option>
                  <option value="540">9 Minutes</option>
                </Form.Control>
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
        {allRooms.length === 0 && <h2>Tidak ada room yang tersedia</h2>}
        <div className="row">
          {allRooms.map((room, idx) => {
            return <Cards key={idx} roomName={room} />;
          })}
        </div>

        {/* <Cards /> */}
      </div>
    </div>
  );
};
