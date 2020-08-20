class Move {
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

  static pionWhite(board, template, row, col) {
    let flag = true;
    if(template[0] === 1 && (row - template[0] > 2)) {
      return undefined;
    } else if (template[0] > 1 && (row - template[0] > 1)) {
      return undefined;
    }

    if (col === template[1] && row > template[0]) {
      for(let i = template[0] + 1; i < row; i++) {
        if(board[i][template[1]] !== 0) {
          flag = false;
          break;
        }
      }
    } else {
      return undefined;
    }
  
    if (flag) {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][col] = template[2];
      newBoard[template[0]][template[1]] = 0;
      return newBoard;
    }
  }

  static pionBlack(board, template, row, col) {
    let flag = true;
    if(template[0] === 6 && template[0] - row > 2) {
      return undefined;
    } else if (template[0] < 6 && template[0] - row > 1) {
      return undefined;
    }

    if (col === template[1] && row < template[0]) {
      for(let i = template[0] - 1; i > row; i--) {
        if(board[i][template[1]] !== 0) {
          flag = false;
          break;
        }
      }
    } else {
      return undefined;
    }
  
    if (flag) {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][col] = template[2];
      newBoard[template[0]][template[1]] = 0;
      return newBoard;
    }
  }

  static king(board, template, row, col) {
    let flag = true;
    if (row - template[0] > 1) {
      flag = false;
    } else if (template[0] - row > 1) {
      flag = false
    } else if (col - template[1] > 1) {
      flag = false;
    } else if (template[1] - col > 1) {
      flag = false;
    }
  
    if (flag) {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][col] = template[2];
      newBoard[template[0]][template[1]] = 0;
      return newBoard;
    }
  }
}

export function defineMovement(board, template, row, col) {
  let newBoard = null;

  if (template[2] === 5 || template[2] === -5) {
    newBoard = Move.benteng(board, template, row, col);
  } else if (template[2] === 6) {
    newBoard = Move.pionWhite(board, template, row, col);
  } else if(template[2] === -6) {
    newBoard = Move.pionBlack(board, template, row, col);
  } else if (template[2] === 1 || template[2] === -1) {
    newBoard = Move.king(board, template, row, col);
  }

  return newBoard;
}