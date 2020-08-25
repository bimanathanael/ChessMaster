import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Cards from "../components/Cards";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:9004/";

export default () => {
  let socket = io(ENDPOINT);
  const history = useHistory();

  const [room, setRoom] = useState('');
  const [allRooms, setAllRooms] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = () => {
    localStorage.clear();
    swal("you are successfully logout", "", "success");
    history.push("/login");
  };

  const doCreateRoom = (e) => {
    e.preventDefault()
    socket.emit('newRoom', room)
  }

  useEffect( () => {
    socket.on("allRooms",(rooms) => {
      setAllRooms(rooms)
    })
    socket.emit("getRooms",() => {
    })
  }, [])
  
  // console.log(allRooms, 'allRooms')
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
      </div>
      <br />
      <div className="row">
        {allRooms.map( (room, idx) => {
          return <Cards key={idx} roomName={room}/>
        })}
      </div>

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
          <form onSubmit={(e)=> doCreateRoom(e)}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Room Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(event) => setRoom(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">apalah</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Rating Select</label>
              <select className="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <Button type="submit" variant="primary"  onClick={handleClose}>Understood</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
