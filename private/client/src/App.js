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
    if (firstClick) {
      const newTemplate = [row, col, val];
      setTemplate(newTemplate);
    } else {
      const newBoard = Move.benteng(board, template, row, col);
      if(newBoard) setBoard(newBoard);
    }
  }

  // function bentengMove(row, col) {
  //   console.log(`row = ${row}, template row = ${template[0]}`)
  //   let flag = true;
  //   if (col === template[1] && row > template[0]) {
  //     for(let i = template[0] + 1; i < row; i++) {
  //       if(board[i][template[1]] !== 0) {
  //         flag = false;
  //         break;
  //       }
  //     }
  //   }

  //   if (col === template[1] && row < template[0]) {
  //     for(let i = template[0] - 1; i > row; i--) {
  //       if(board[i][template[1]] !== 0) {
  //         flag = false;
  //         break;
  //       }
  //     }
  //   }

  //   if (row === template[0] && col > template[1]) {
  //     for(let i = template[1] + 1; i < col; i++) {
  //       if(board[template[0]][i] !== 0) {
  //         flag = false;
  //         break;
  //       }
  //     }
  //   }

  //   if (row === template[0] && col < template[1]) {
  //     for(let i = template[1] - 1; i > col; i--) {
  //       if(board[template[0]][i] !== 0) {
  //         flag = false;
  //         break;
  //       }
  //     }
  //   }

  //   if (flag) {
  //     const newBoard = JSON.parse(JSON.stringify(board));
  //     newBoard[row][col] = template[2];
  //     newBoard[template[0]][template[1]] = 0;
  //     setBoard(newBoard);
  //   }
  // }

  // function pionMove(row) {
    
  // }

  console.log(board, "<<<< board")

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
