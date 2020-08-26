export function legalHorVerMoves(board, row, col) {
  let legalMoves = [];
  const flag = isNaN(String(board[row][col])[0]);

  // collect legal horizontal movements
  for(let i = col + 1; i < board[row].length; i++) {
    if(board[row][i] === 0) {
      legalMoves.push([row, i]);
    } else {
      if(flag !== isNaN(String(board[row][i])[0])) legalMoves.push([row, i]);
      break;
    }
  }

  for(let i = col - 1; i >= 0; i--) {
    if(board[row][i] === 0) {
      legalMoves.push([row, i]);
    } else {
      if(flag !== isNaN(String(board[row][i])[0])) legalMoves.push([row, i]);
      break;
    }
  }

  // collect legal vertical movements
  for(let i = row - 1; i >= 0; i--) {
    if(board[i][col] === 0) {
      legalMoves.push([i, col]);
    } else {
      if(flag !== isNaN(String(board[i][col])[0])) legalMoves.push([i, col]);
      break;
    }
  }

  for(let i = row + 1; i < board.length; i++) {
    if(board[i][col] === 0) {
      legalMoves.push([i, col]);
    } else {
      if(flag !== isNaN(String(board[i][col])[0])) legalMoves.push([i, col]);
      break;
    }
  }

  return legalMoves;
}


export function legalDiagonalMoves(board, row, col) {
  let legalMoves = [];
  const flag = isNaN(String(board[row][col])[0]);

  // collect legal diagonal-up movements
  for(let i = row + 1, j = col + 1; i < board.length; i++) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      if(flag !== isNaN(String(board[i][j])[0])) legalMoves.push([i, j]);
      break;
    }
    j++;
  }
  for(let i = row + 1, j = col - 1; i < board.length; i++) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      if(flag !== isNaN(String(board[i][j])[0])) legalMoves.push([i, j]);
      break;
    }
    j--;
  }

  // collect legal diagonal-down movements
  for(let i = row - 1, j = col - 1; i >= 0; i--) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      if(flag !== isNaN(String(board[i][j])[0])) legalMoves.push([i, j]);
      break;
    }
    j--;
  }
  for(let i = row - 1, j = col + 1; i >= 0; i--) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      if(flag !== isNaN(String(board[i][j])[0])) legalMoves.push([i, j]);
      break;
    }
    j++;
  }

  return legalMoves;
}


export function legalBlackPawnMoves(board, row, col) {
  let legalMoves = [];
  const flag = isNaN(String(board[row][col])[0]);

  if (row === 6) {
    for(let i = row - 1; i > row - 3; i--) {
      if (board[i][col] === 0) legalMoves.push([i, col]);
      else break
    }
  } else {
    if (board[row-1][col] === 0) legalMoves = [[row-1, col]];
  }
  // can make diagonal move if diagonal target is opponent side
  if (board[row-1][col+1] !== 0 && (isNaN(String(board[row-1][col+1])[0]) !== flag)) legalMoves.push([row-1, col+1]);
  if (board[row-1][col-1] !== 0 && (isNaN(String(board[row-1][col-1])[0]) !== flag)) legalMoves.push([row-1, col-1]);
  
  return legalMoves;
}


export function legalKingMoves(board, row, col) {
  const flag = isNaN(String(board[row][col])[0]);
  
  let legalMoves = [
    [row+1, col-1], [row+1, col], [row+1, col+1],
    [row, col-1], [row, col+1],
    [row-1, col-1], [row-1, col], [row-1, col+1]
  ]

  if(row === 7 && col === 4) {
    for(let i = col+1; i < board.length; i++) {
      if(i < 7 && board[row][i] !== 0) break;
      if(i === 7 && isNaN(String(board[row][i])[0]) === flag &&
      (board[row][i] === 5 || board[row][i] === -5)) {
        legalMoves.push([row, col+2]);
      }
    }
    for(let i = col-1; i >= 0; i--) {
      if(i > 0 && board[7][i] !== 0) break;
      if(i === 0 && isNaN(String(board[row][i])[0]) === flag &&
      (board[row][i] === 5 || board[row][i] === -5)) {
        legalMoves.push([row, col-2]);
      }
    }
  }


  legalMoves.forEach(arr => {
    const knightMoves = [
      [arr[0]+2, arr[1]-1], [arr[0]+2, arr[1]+1],
      [arr[0]-2, arr[1]-1], [arr[0]-2, arr[1]+1],
      [arr[0]+1, arr[1]-2], [arr[0]-1, arr[1]-2],
      [arr[0]-1, arr[1]+2], [arr[0]+1, arr[1]+2]
    ]

    if (arr[0] > 7 || arr[0] < 0 || arr[1] > 7 || arr[1] < 0) {
      legalMoves = legalMoves.filter(e => e !== arr);
      return;
    }

    if (arr[0] >= 0 && arr[0] < 8 && arr[1] >= 0 && arr[1] < 8) {
      if (board[arr[0]][arr[1]] !== 0 && flag === isNaN(String(board[arr[0]][arr[1]])[0])) {
        legalMoves = legalMoves.filter(e => e !== arr);
        return;
      }

      // cek box is safe from opponent's knight
      for(let i = 0; i < knightMoves.length; i++) {
        let move = knightMoves[i];
        if(move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8 &&
        isNaN(String(board[move[0]][move[1]])[0]) !== flag &&
        (board[move[0]][move[1]] === 4 || board[move[0]][move[1]] === -4)) {
          legalMoves = legalMoves.filter(e => e !== arr);
          return;
        }
      }
      
      // cek box is safe from opponent's king
      for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
          if(i === 1 && j === 1) continue;

          if(arr[0] > 0 && arr[0] < 7 && arr[1] > 0 && arr[1] < 7 &&
          isNaN(String(board[arr[0] + i][arr[1] + j])[0]) !== flag &&
          (board[arr[0] + i][arr[1] + j] === 1 || board[arr[0] + i][arr[1] + j] === -1)) {
            legalMoves = legalMoves.filter(e => e !== arr);
            return;
          }
        }
      }

      // cek box is safe from opponent's pawn
      if(isNaN(String(board[arr[0] - 1][arr[1] + 1])[0]) !== flag &&
      (board[arr[0] - 1][arr[1] + 1] === 6 || board[arr[0] - 1][arr[1] + 1] === -6)) {
        legalMoves = legalMoves.filter(e => e !== arr);
        return;
      } else if(isNaN(String(board[arr[0] - 1][arr[1] - 1])[0]) !== flag &&
      (board[arr[0] - 1][arr[1] - 1] === 6 || board[arr[0] - 1][arr[1] - 1] === -6)) {
        legalMoves = legalMoves.filter(e => e !== arr);
        return;
      }

      // cek all diagonal box is clear from opponent
      for(let i = arr[0] + 1, j = arr[1] + 1; i < board.length && j < board.length; i++, j++) {
        if(isNaN(String(board[i][j])[0]) !== flag && board[i][j] !== 0 &&
        (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] - 2 && e[1] === arr[1] - 2)) {
              return false;
            }
            return true;
          });
          return;
        } else if(board[i][j] !== 0) {
          break;
        }
        
      }
      for(let i = arr[0] + 1, j = arr[1] - 1; i < board.length && j <= 0; i++, j--) {
        if(isNaN(String(board[i][j])[0]) !== flag && board[i][j] !== 0 &&
        (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] - 2 && e[1] === arr[1] + 2)) {
              return false;
            }
            return true;
          });
          return;
        }
        else if(board[i][j] !== 0) {
          break;
        }
      }
      for(let i = arr[0] - 1, j = arr[1] - 1; i >= 0 && j >= 0; i--, j--) {
        if(isNaN(String(board[i][j])[0]) !== flag && board[i][j] !== 0 &&
        (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] + 2 && e[1] === arr[1] + 2)) {
              return false;
            }
            return true;
          });
          return;
        }
        else if(board[i][j] !== 0) {
          break;
        }
      }
      for(let i = arr[0] - 1, j = arr[1] + 1; i >= 0 && j < board.length; i--, j++) {
        if(isNaN(String(board[i][j])[0]) !== flag && board[i][j] !== 0 &&
        (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] + 2 && e[1] === arr[1] - 2)) {
              return false;
            }
            return true;
          });
          return;
        }
        else if(board[i][j] !== 0) {
          break;
        }
      }
      

      // cek all vertical and horizontal box is safe from opponent's rook or opponent's queen
      for(let i = arr[1] + 1; i < board[arr[0]].length; i++) {
        if(isNaN(String(board[arr[0]][i])[0]) !== flag && board[arr[0]][i] !== 0 &&
        (board[arr[0]][i] === 2 || board[arr[0]][i] === -2 || board[arr[0]][i] === 5 || board[arr[0]][i] === -5)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] && e[1] === arr[1] - 2)) {
              return false;
            }
            return true;
          });
          return;
        } else if(board[arr[0]][i] !== 0) {
          break;
        }
      }
      for(let i = arr[1] - 1; i >= 0; i--) {
        if(isNaN(String(board[arr[0]][i])[0]) !== flag && board[arr[0]][i] !== 0 &&
        (board[arr[0]][i] === 2 || board[arr[0]][i] === -2 || board[arr[0]][i] === 5 || board[arr[0]][i] === -5)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] && e[1] === arr[1] + 2)) {
              return false;
            }
            return true;
          });
          return;
        } else if(board[arr[0]][i] !== 0) {
          break;
        }
      }
      for(let i = arr[0] - 1; i >= 0; i--) {
        if(isNaN(String(board[i][arr[1]])[0]) !== flag && board[i][arr[1]] !== 0 &&
        (board[i][arr[1]] === 2 || board[i][arr[1]] === -2 || board[i][arr[1]] === 5 || board[i][arr[1]] === -5)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] + 2 && e[1] === arr[1])) {
              return false;
            }
            return true;
          });
          return;
        } else if(board[i][arr[1]] !== 0) {
          break;
        }
      }
      for(let i = arr[0] + 1; i < board.length; i++) {
        if(isNaN(String(board[i][arr[1]])[0]) !== flag && board[i][arr[1]] !== 0 &&
        (board[i][arr[1]] === 2 || board[i][arr[1]] === -2 || board[i][arr[1]] === 5 || board[i][arr[1]] === -5)) {
          legalMoves = legalMoves.filter(e => {
            if (e === arr || (e[0] === arr[0] - 2 && e[1] === arr[1])) {
              return false;
            }
            return true;
          });
          return;
        } else if(board[i][arr[1]] !== 0) {
          break;
        }
      }
    
  }
    
  });
  
  return legalMoves;
}

export function legalKnightMoves(board, row, col) {
  const flag = isNaN(String(board[row][col])[0]);

  let legalMoves = [
    [row+2, col-1], [row+2, col+1],
    [row-2, col-1], [row-2, col+1],
    [row+1, col-2], [row-1, col-2],
    [row-1, col+2], [row+1, col+2]
  ]

  legalMoves.forEach(arr => {
    if (arr[0] >= 0 && arr[0] < 8 && arr[1] >= 0 && arr[1] < 8) {
      if (board[arr[0]][arr[1]] !== 0 && flag === isNaN(String(board[arr[0]][arr[1]])[0])) {
        legalMoves = legalMoves.filter(e => e !== arr);
      }
    }
  });
  
  return legalMoves;
}