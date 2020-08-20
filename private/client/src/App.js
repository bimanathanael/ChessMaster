import React, { useState, useEffect } from 'react';
import Move from './logics/Movement';
import './App.css';

function App() {
  let isEven = true;
  const [template, setTemplate] = useState([]);
  const [firstClick, setFirstClick] = useState(false);

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
  ])
  
  useEffect(() => {
    setFirstClick(false);
  }, [template]);

  useEffect(() => {
    setFirstClick(true);
    // eslint-disable-next-line
  }, [board]);

  
  function defineBox(row, col) {
    if(row % 2 === 0) {
      isEven = !isEven
      if(isEven) return 'col, black-box';
      else return 'col, white-box';
    } else {
      if(col % 2 === 0) return 'col, black-box';
      else return 'col, white-box';
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
    <div className="App">
      <div className="board">
        <div className="row justify-content-center">
          {board.map((boardRow, row) => {
            return boardRow.map((value, col) => {
              return (
                <div className={defineBox(row, col)} key={col} onClick={() => handleClick(row, col, value)}>
                  <p>{value}</p>
                </div>
              )
            })
          })}
        </div>
      </div>
        <h4>{template}</h4>
    </div>
  );
}

export default App;
