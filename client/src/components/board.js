import React, { useState, useEffect } from "react";
import { defineLegalMoves, moveValidation } from '../logics/LogicController';
import { Modal } from "react-bootstrap";

function Board() {
  let isEven = true;

  // temp = [row, col, val]
  const [temp, setTemp] = useState([]);
  const [legalMoves, setLegalMoves] = useState([]);
  const [modalWhite, setModalWhite] = useState(false);
  const [modalBlack, setModalBlack] = useState(false);

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

  // 1 = Raja, 2 = PM, 3 = Peluncur, 4 = Kuda, 5 = Benteng, 6 = Pion
  const [board, setBoard] = useState([
    [5, 4, 3, 2, 1, 3, 4, 5],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [-6, -6, -6, -6, -6, -6, -6, -6],
    [-5, -4, -3, -1, -2, -3, -4, -5],
  ]);

  

  useEffect(() => {
    for(const i in board[0]) {
      if (board[0][i] === -6) setModalBlack(true);
    }
    // eslint-disable-next-line
  }, [board[0]]);

  useEffect(() => {
    for(const i in board[0]) {
      if (board[7][i] === 6) setModalWhite(true);
    }
    // eslint-disable-next-line
  }, [board[0]])

  function chesspieces(value) {
    if (value === 1) {
      return <img className="pieces" src={kingWhite} alt=""/>;
    } else if (value === 2) {
      return <img className="pieces" src={queenWhite} alt=""/>;
    } else if (value === 3) {
      return <img className="pieces" src={bishopWhite} alt=""/>;
    } else if (value === 4) {
      return <img className="pieces" src={knightWhite} alt=""/>;
    } else if (value === 5) {
      return <img className="pieces" src={rookWhite} alt=""/>;
    } else if (value === 6) {
      return <img className="pieces" src={pawnWHite} alt=""/>;
    } else if (value === -1) {
      return <img className="pieces" src={kingBlack} alt=""/>;
    } else if (value === -2) {
      return <img className="pieces" src={queenBlack} alt=""/>;
    } else if (value === -3) {
      return <img className="pieces" src={bishopBlack} alt=""/>;
    } else if (value === -4) {
      return <img className="pieces" src={knightBlack} alt=""/>;
    } else if (value === -5) {
      return <img className="pieces" src={rookBlack} alt=""/>;
    } else if (value === -6) {
      return <img className="pieces" src={pawnBlack} alt=""/>;
    }
  }

  function isLegalMoves(row, col) {
    for (const i in legalMoves) {
      if(legalMoves[i][0] === row && legalMoves[i][1] === col) {
        if(String(temp[2])[0] === '-') return <div className="dot-black"></div>;
        else return <div className="dot-white"></div>;
      }
    }
  }

  function defineBox(row, col) {
    if (row % 2 === 0) {
      isEven = !isEven;
      if (row === temp[0] && col === temp[1]) return "col, selected-box";
      else if (isEven) return "col, black-box";
      else return "col, white-box";
    } else {
      if (row === temp[0] && col === temp[1]) return "col, selected-box";
      else if (col % 2 === 0) return "col, black-box";
      else return "col, white-box";
    }
  }

  function styleBoard() {
    if(temp.length < 1) return "board-grab";
    else return "board-grabbing";
  }

  function handleClick(row, col, val) {
    if (temp[0] === row && temp[1] === col)  {
      setLegalMoves([]);
      return setTemp([]);
    }
    
    if (temp.length === 0 && val !== 0) {
      const newTemp = [row, col, val];
      const data = defineLegalMoves(board, row, col, val);
      setTemp(newTemp);
      setLegalMoves(data);
    } else if(temp.length > 0 && temp[2] !== 0) {
      const newBoard = moveValidation(board, temp, row, col, legalMoves);
      if(newBoard) {
        setTemp([]);
        setBoard(newBoard);
        setLegalMoves([]);
      }
    }
  }

  function pieceChange(val) {
    let newBoard = JSON.parse(JSON.stringify(board));
    for(let i = 0; i < board.length; i+=7) {
      for(let j = 0; j < newBoard[i].length; j++) {
        if (newBoard[i][j] === 6 || newBoard[i][j] === -6) {
          newBoard[i][j] = val;
        }
      }
    }
    if(String(val)[0] === '-') setModalBlack(false);
    else setModalWhite(false);
    setBoard(newBoard);
  }

  return (
    <div className="motherBoard">
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
  );
}

export default Board;
