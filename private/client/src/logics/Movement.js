class Movement {
  static benteng(board, template, row, col) {
    let flag = true;
    if(row !== template[0] && col !== template[1]) {
      return undefined;
    }

    if (col === template[1] && row > template[0]) {
      for(let i = template[0] + 1; i < row; i++) {
        if(board[i][template[1]] !== 0) {
          flag = false;
          break;
        }
      }
    }
  
    if (col === template[1] && row < template[0]) {
      for(let i = template[0] - 1; i > row; i--) {
        if(board[i][template[1]] !== 0) {
          flag = false;
          break;
        }
      }
    }
  
    if (row === template[0] && col > template[1]) {
      for(let i = template[1] + 1; i < col; i++) {
        if(board[template[0]][i] !== 0) {
          flag = false;
          break;
        }
      }
    }
  
    if (row === template[0] && col < template[1]) {
      for(let i = template[1] - 1; i > col; i--) {
        if(board[template[0]][i] !== 0) {
          flag = false;
          break;
        }
      }
    }
  
    if (flag) {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][col] = template[2];
      newBoard[template[0]][template[1]] = 0;
      return newBoard;
    }
  }
}

export default Movement;