import React, { useState, useEffect } from "react";
import {
  defineLegalMoves,
  moveValidation,
  catslingHandler,
  catslingHandler,
} from "../logics/LogicController";
import { checkChecker, isCheckMate, } from "../logics/CheckLogic";
import { Modal, Button } from "react-bootstrap";
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
// import { updateScore } from "../store/actiupdateScoreons/userAction";
import { useMutation, gql } from "@apollo/client";
import { GET_USERS } from "../pages/LeaderBoard";
import { GET_USERBYID } from "../pages/MainMenu";
import { ImFlag } from "react-icons/im";

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

const UPDATE_SCORE = gql`
  mutation UpdateScoreUser($updateScore: inputUserUpdate) {
    updateUser(user: $updateScore) {
      username
      score
    }
  }
`;

const socket = io("http://localhost:9001/");
const happyFace = require("../asset/happyFace.png");
const sadFace = require("../asset/sadFace.png");

function Board({ location }) {
  const [mutationUpdateScore] = useMutation(UPDATE_SCORE, {
    refetchQueries: [{ query: GET_USERS }],
    awaitRefetchQueries: true,
  });

  const [mutationAddHistory, { error }] = useMutation(ADD_TO_HISTORYGAME, {
    onError: () => {
      swal("wawa", "asdas", "success");
    },
  });
  const dispatch = useDispatch();
  let isEven = true;

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const dic = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const [historyMoves, setHistoryMoves] = useState([]);
  const [temp, setTemp] = useState([]);
  const [legalMoves, setLegalMoves] = useState([]);
  const [modalWhite, setModalWhite] = useState(false);
  const [opponentUsername, setOpponentUsername] = useState("");
  const [modalBlack, setModalBlack] = useState(false);
  const [turn, setTurn] = useState(null);
  const [side, setSide] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [enableCastling, setEnableCastling] = useState(true);

  //timer state
  const [displayBoard, setDisplayBoard] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [time, setTime] = useState({ m: 3, s: 3 });
  const [timeOpponent, setTimeOpponent] = useState({ m: 3, s: 3 });
  const [status, setStatus] = useState(0);
  const [interv, setInterv] = useState();
  const [statusOpponent, setStatusOpponent] = useState(0);
  const [intervOpponent, setIntervOpponent] = useState();
  var updatedS = time.s;
  var updatedM = time.m;
  var updatedSOpponent = timeOpponent.s;
  var updatedMOpponent = timeOpponent.m;
  const history = useHistory();

  const rookBlack = require("../chess-pack/chess-rook-black.png");
  const rookWhite = require("../chess-pack/chess-rook-white.png");
  const pawnWHite = require("../chess-pack/chess-pawn-white.png");
  const pawnBlack = require("../chess-pack/chess-pawn-black.png");
  const bishopWhite = require("../chess-pack/chess-bishop-white.png");
  const bishopBlack = require("../chess-pack/chess-bishop-black.png");
  const kingWhite = require("../chess-pack/chess-king-white.png");
  const kingBlack = require("../chess-pack/chess-king-black.png");
  const knightWhite = require("../chess-pack/chess-knight-white.png");
  const knightBlack = require("../chess-pack/chess-knight-black.png");
  const queenWhite = require("../chess-pack/chess-queen-white.png");
  const queenBlack = require("../chess-pack/chess-queen-black.png");

  const [board, setBoard] = useState([]);

  socket.on("setUp", (data) => {
    setBoard(data.board);
    setTurn(data.turn);
    setSide(data.side);
  });

  socket.on("endTurn", (data) => {
    setBoard(data.board);
    setTurn(data.turn);
  });

  socket.on("showButton", (status) => {
    setDisplayButton(status);
  });

  socket.on("pawn evolution", (data) => {
    setBoard(data.board);
  });

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    console.log("masuk use eeffct");
  }, [location.search]);

  useEffect(() => {
    for (const i in board[0]) {
      if (board[0][i] === -6) setModalBlack(true);
      else if (board[0][i] === 6) setModalWhite(true);
    }
    // eslint-disable-next-line
  }, [board[0]]);

  useEffect(() => {
    if (board.length > 0 && side !== "") {
      const { status: returnFunc, path, kingRow, kingCol } = checkChecker(
        board,
        side
      );
      setIsCheck(returnFunc);
      if (returnFunc) {
        setEnableCastling(false);
        if (
          isCheckMate(board, side, path, kingRow, kingCol) ||
          (time.s === 0 && time.m === 0)
        ) {
          const updatedScore = {
            username: localStorage.getItem("username"),
            score: -5,
          };
          mutationUpdateScore({
            variables: {
              updateScore: updatedScore,
            },
          });
          const newPlayer = {
            player: localStorage.getItem("username"),
            opponent: opponentUsername,
            status: "lose",
            score: "-5",
          };
          if (opponentUsername) {
            mutationAddHistory({
              variables: { addHistoryGame: newPlayer },
            });
          }
          swal({
            title: "You Lose",
          });
          history.push(`/leaderboard`);
          socket.emit("moveToLeaderboard");
          socket.emit("moveToLeaderboard2");
        }
      }
    }
  }, [board]);

  //timer logic

  useEffect(() => {
    if (time.s === 0 && time.m === 0) {
      const updatedScore = {
        username: localStorage.getItem("username"),
        score: -5,
      };
      mutationUpdateScore({
        variables: {
          updateScore: updatedScore,
        },
      });
      history.push(`/leaderboard`);

      socket.emit("moveToLeaderboard");
    }
  }, [time]);

  useEffect(() => {
    socket.on("timerStop", () => {
      console.log("timerStop");
      clearInterval(intervOpponent);
      // setStatusOpponent(1);
    });
  }, [intervOpponent]);

  useEffect(() => {
    if (time.s === 0 && time.m === 0 && opponentUsername) {
      const newPlayer = {
        player: localStorage.getItem("username"),
        opponent: opponentUsername,
        status: "lose",
        score: "-5",
      };
      if (opponentUsername) {
        mutationAddHistory({
          variables: { addHistoryGame: newPlayer },
        });
      }
      swal({
        title: "You Lose",
      });
      socket.emit("moveToLeaderboard2");
    }
  }, [time, opponentUsername]);

  useEffect(() => {
    socket.on("moveToLeaderboard2", () => {
      const newPlayer = {
        player: localStorage.getItem("username"),
        opponent: opponentUsername,
        status: "win",
        score: "+50",
      };
      if (opponentUsername) {
        mutationAddHistory({
          variables: { addHistoryGame: newPlayer },
        });
      }
      swal({
        title: "You Win",
      });
      history.push(`/leaderboard`);
    });
  }, [opponentUsername]);

  useEffect(() => {
    socket.on("moveToLeaderboard", () => {
      let updateScore = {
        username: localStorage.getItem("username"),
        score: 50,
      };
      mutationUpdateScore({
        variables: {
          updateScore,
        },
      });
      socket.emit("editLeaderboard", updateScore);
    });
  }, []);

  useEffect(() => {
    socket.on("editLeaderboard", (update) => {
      mutationUpdateScore({ variables: { updateScore: update } });
      history.push(`/leaderboard`);
    });
  }, []);
  useEffect(() => {
    socket.on("timerStop", () => {
      console.log("timerStop");
      clearInterval(intervOpponent);
      // setStatusOpponent(1);
    });
  }, [intervOpponent]);

  useEffect(() => {
    socket.on("timerStop2", () => {
      console.log("timerStop2");
      run();
      setStatus(1);
      setInterv(setInterval(run, 1000));
    });
  }, []);

  useEffect(() => {
    socket.on("timerStart", (enemy) => {
      socket.emit("getEnemy", localStorage.getItem("username"));
      setOpponentUsername(enemy);
      setDisplayBoard(true);
      runOpponent();
      setStatusOpponent(1);
      setIntervOpponent(setInterval(runOpponent, 1000));
    });
  }, []);

  useEffect(() => {
    socket.on("getEnemy", (enemy) => {
      setOpponentUsername(enemy);
    });
  }, []);

  const startTimerHandler = () => {
    run();
    setInterv(1);
    setInterv(setInterval(run, 1000));
    socket.emit("timerStart", localStorage.getItem("username"));
    setDisplayBoard(true);
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(1);
    runOpponent();
    setStatusOpponent(1);
    setIntervOpponent(setInterval(runOpponent, 1000));
    socket.emit("timerStop");
    socket.emit("timerStop2");
  };

  const run = () => {
    if (updatedS === 0) {
      updatedM--;
      updatedS = 60;
    }
    updatedS--;
    return setTime({ s: updatedS, m: updatedM });
  };

  const runOpponent = () => {
    if (updatedSOpponent === 0) {
      updatedMOpponent--;
      updatedSOpponent = 60;
    }
    updatedSOpponent--;
    return setTimeOpponent({ s: updatedSOpponent, m: updatedMOpponent });
  };

  //surender handler
  const surrenderHandler = () => {
    const updatedScore = {
      username: localStorage.getItem("username"),
      score: -5,
    };
    mutationUpdateScore({
      variables: {
        updateScore: updatedScore,
      },
    });
    const newPlayer = {
      player: localStorage.getItem("username"),
      opponent: opponentUsername,
      status: "lose",
      score: "-5",
    };
    if (opponentUsername) {
      mutationAddHistory({
        variables: { addHistoryGame: newPlayer },
      });
    }
    swal({
      title: "You Lose",
    });
    history.push(`/leaderboard`);
    socket.emit("moveToLeaderboard");
    socket.emit("moveToLeaderboard2");
  };

  function chesspieces(value) {
    if (value === 1) {
      return <img className="pieces" src={kingWhite} alt="" />;
    } else if (value === 2) {
      return <img className="pieces" src={queenWhite} alt="" />;
    } else if (value === 3) {
      return <img className="pieces" src={bishopWhite} alt="" />;
    } else if (value === 4) {
      return <img className="pieces" src={knightWhite} alt="" />;
    } else if (value === 5) {
      return <img className="pieces" src={rookWhite} alt="" />;
    } else if (value === 6) {
      return <img className="pieces" src={pawnWHite} alt="" />;
    } else if (value === -1) {
      return <img className="pieces" src={kingBlack} alt="" />;
    } else if (value === -2) {
      return <img className="pieces" src={queenBlack} alt="" />;
    } else if (value === -3) {
      return <img className="pieces" src={bishopBlack} alt="" />;
    } else if (value === -4) {
      return <img className="pieces" src={knightBlack} alt="" />;
    } else if (value === -5) {
      return <img className="pieces" src={rookBlack} alt="" />;
    } else if (value === -6) {
      return <img className="pieces" src={pawnBlack} alt="" />;
    }
  }

  function isLegalMoves(row, col) {
    for (const i in legalMoves) {
      if (legalMoves[i][0] === row && legalMoves[i][1] === col) {
        if (String(temp[2])[0] === "-")
          return <div className="dot-black"></div>;
        else return <div className="dot-white"></div>;
      }
    }
  }

  function defineBox(row, col) {
    if (row % 2 === 0) {
      isEven = !isEven;
      if (row === temp[0] && col === temp[1]) return "col, selected-box";

      if (side === "white") {
        if (isEven) return "col, black-box";
        else return "col, white-box";
      } else {
        if (isEven) return "col, white-box";
        else return "col, black-box";
      }
    } else {
      if (row === temp[0] && col === temp[1]) return "col, selected-box";
      if (side === "white") {
        if (col % 2 === 0) return "col, black-box";
        else return "col, white-box";
      } else {
        if (col % 2 === 0) return "col, white-box";
        else return "col, black-box";
      }
    }
  }

  function styleBoard() {
    if (temp.length < 1) return "board-grab";
    else return "board-grabbing";
  }

  function handleClick(row, col, val) {
    if (temp[0] === row && temp[1] === col) {
      setLegalMoves([]);
      return setTemp([]);
    }
    if (!turn) {
      return null;
    }
    if (temp.length === 0 && val !== 0) {
      if (side === "white" && String(val)[0] === "-") {
        return null;
      } else if (side === "black" && String(val)[0] !== "-") {
        return null;
      }
      const newTemp = [row, col, val];
      const data = defineLegalMoves(board, row, col, val, enableCastling);
      setTemp(newTemp);
      setLegalMoves(data);
    } else if (temp.length > 0 && temp[2] !== 0) {
      let newBoard = moveValidation(board, temp, row, col, legalMoves);
      if (newBoard) {
        if (temp[2] === 1 || temp[2] === -1) {
          if (!isCheck && enableCastling && temp[0] === 7 && temp[1] === 4) {
            newBoard = catslingHandler(newBoard, side);
          }
          setEnableCastling(false);
        }
        let moves = historyMoves;
        moves.push([
          `[${dic[temp[1]]}${temp[0] + 1} to ${dic[col]}${row + 1}]`,
        ]);
        setHistoryMoves(moves);
        const { status: returnFunc } = checkChecker(newBoard, side);
        if (!returnFunc) {
          socket.emit("finishTurn", { board: newBoard });
          setTemp([]);
          setBoard(newBoard);
          setLegalMoves([]);
          setTurn(!turn);

          clearInterval(interv);
          setStatus(1);
          runOpponent();
          setStatusOpponent(1);
          setIntervOpponent(setInterval(runOpponent, 1000));
          socket.emit("timerStop");
          socket.emit("timerStop2");
        } else {
          setLegalMoves([]);
          setTemp([]);
        }
      } else {
        setLegalMoves([]);
        setTemp([]);
      }
    }
  }

  function pieceChange(val) {
    let newBoard = JSON.parse(JSON.stringify(board));
    for (let i = 0; i < newBoard[0].length; i++) {
      if (newBoard[0][i] === 6 || newBoard[0][i] === -6) {
        newBoard[0][i] = val;
      }
    }
    socket.emit("pawn-evolution", { board: newBoard });
    setBoard(newBoard);
    if (String(val)[0] === "-") setModalBlack(false);
    else setModalWhite(false);
  }

  console.log(historyMoves, "<<<< historyMoves");
  return (
    <>
      {console.log(time.m, time.s, "cekcek")}
      {displayButton && !displayBoard && (
        <button
          onClick={() => startTimerHandler()}
          className="btn btn-info"
          style={{
            width: "100%",
            boxShadow: "rgba(0, 0, 0, 0.75) 2px 3px 5px 0px",
          }}
        >
          Start Game
        </button>
      )}

      {displayBoard && (
        <div>
          <div className="d-flex justify-content-between">
            <h1 class="timer">
              {time.m < 10 ? `0${time.m}` : time.m}:
              {time.s < 10 ? `0${time.s}` : time.s}
            </h1>
            <Button
              style={{
                backgroundColor: "rgb(174, 25, 26) ",
                border: "1px solid #2f2525",
              }}
              onClick={() => surrenderHandler()}
            >
              Surrender &nbsp; <ImFlag style={{ marginBottom: "7px" }} />
            </Button>
            <h1 class="timer">
              {timeOpponent.m < 10 ? `0${timeOpponent.m}` : timeOpponent.m}:
              {timeOpponent.s < 10 ? `0${timeOpponent.s}` : timeOpponent.s}
            </h1>
          </div>
          <div className="motherBoard">
            {displayBoard && (
              <div className={styleBoard()}>
                <div className="row justify-content-center">
                  {board.map((boardRow, row) => {
                    return boardRow.map((value, col) => {
                      return (
                        <div
                          className={defineBox(row, col)}
                          key={col}
                          onClick={() => handleClick(row, col, value)}
                        >
                          {chesspieces(value)}
                          {isLegalMoves(row, col)}
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            )}

            <Modal
              show={modalWhite}
              size="lg"
              onHide={() => setModalWhite(false)}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title>Choose One</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-chess">
                  <img
                    className="pieces"
                    src={queenWhite}
                    alt="queen"
                    onClick={() => pieceChange(2)}
                  />
                  <img
                    className="pieces"
                    src={bishopWhite}
                    alt="bishop"
                    onClick={() => pieceChange(3)}
                  />
                  <img
                    className="pieces"
                    src={knightWhite}
                    alt="knight"
                    onClick={() => pieceChange(4)}
                  />
                  <img
                    className="pieces"
                    src={rookWhite}
                    alt="rook"
                    onClick={() => pieceChange(5)}
                  />
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              show={modalBlack}
              size="lg"
              onHide={() => setModalBlack(false)}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title>Choose One</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-chess">
                  <img
                    className="pieces"
                    src={queenBlack}
                    alt="queen"
                    onClick={() => pieceChange(-2)}
                  />
                  <img
                    className="pieces"
                    src={bishopBlack}
                    alt="bishop"
                    onClick={() => pieceChange(-3)}
                  />
                  <img
                    className="pieces"
                    src={knightBlack}
                    alt="knight"
                    onClick={() => pieceChange(-4)}
                  />
                  <img
                    className="pieces"
                    src={rookBlack}
                    alt="rook"
                    onClick={() => pieceChange(-5)}
                  />
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

export default Board;
