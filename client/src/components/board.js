import React, { useState, useEffect } from "react";
import Move from "../logics/Movement";
// import "..";

function Board() {
  let isEven = true;
  const [template, setTemplate] = useState([]);
  const [firstClick, setFirstClick] = useState(false);

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
    setFirstClick(false);
  }, [template]);

  useEffect(() => {
    setFirstClick(true);
    // eslint-disable-next-line
  }, [board]);

  function chesspieces(value) {
    if (value === 1) {
      return <img className="pieces" src={kingWhite} />;
    } else if (value === 2) {
      return <img className="pieces" src={queenWhite} />;
    } else if (value === 3) {
      return <img className="pieces" src={bishopWhite} />;
    } else if (value === 4) {
      return <img className="pieces" src={knightWhite} />;
    } else if (value === 5) {
      return <img className="pieces" src={rookWhite} />;
    } else if (value === 6) {
      return <img className="pieces" src={pawnWHite} />;
    } else if (value === -1) {
      return <img className="pieces" src={kingBlack} />;
    } else if (value === -2) {
      return <img className="pieces" src={queenBlack} />;
    } else if (value === -3) {
      return <img className="pieces" src={bishopBlack} />;
    } else if (value === -4) {
      return <img className="pieces" src={knightBlack} />;
    } else if (value === -5) {
      return <img className="pieces" src={rookBlack} />;
    } else if (value === -6) {
      return <img className="pieces" src={pawnBlack} />;
    }
  }

  function defineBox(row, col) {
    if (row % 2 === 0) {
      isEven = !isEven;
      if (isEven) return "col, black-box";
      else return "col, white-box";
    } else {
      if (col % 2 === 0) return "col, black-box";
      else return "col, white-box";
    }
  }

  function handleClick(row, col, val) {
    if (template[0] === row && template[1] === col)  {
      return setFirstClick(true);
    }
    if (firstClick && val !== 0) {
      const newTemplate = [row, col, val];
      setTemplate(newTemplate);
    } else if(template[2] !== 0){
      if (template[2] === 5 || template[2] === -5) {
        const newBoard = Move.benteng(board, template, row, col);
        if(newBoard) setBoard(newBoard);
      } else if (template[2] === 6) {
        const newBoard = Move.pionWhite(board, template, row, col);
        if(newBoard) setBoard(newBoard);
      } else if(template[2] === -6) {
        const newBoard = Move.pionBlack(board, template, row, col);
        if(newBoard) setBoard(newBoard);
      } else if (template[2] === 1 || template[2] === -1) {
        const newBoard = Move.king(board, template, row, col);
        if(newBoard) setBoard(newBoard);
      }
    }
  }

  return (
    <div className="motherBoard">
      <div className="board">
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
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default Board;
