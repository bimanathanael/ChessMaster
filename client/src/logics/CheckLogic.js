import { legalKingMoves } from './LegalMovesChecker';

function getKingPosition(board, side) {
  let row = null;
  let col = null;

  for(let i in board) {
    for(let j in board[i]) {
      if(side === 'white' && board[i][j] === 1) {
        row = i;
        col = j;
        break;
      } else if (side === 'black' && board[i][j] === -1) {
        row = i;
        col = j;
        break;
      }
    }
  }
  return {row, col};
}


export function checkChecker(board, side) {
  const flag = side === 'white' ? false : true;
  let {row, col} = getKingPosition(board, side);
  let path = [];
  let status = false;

  row = Number(row);
  col = Number(col);
  
  const knightMoves = [
    [row+2, col-1], [row+2, col+1],
    [row-2, col-1], [row-2, col+1],
    [row+1, col-2], [row-1, col-2],
    [row-1, col+2], [row+1, col+2]
  ];
  
  // cek is check by knight or not
  for(let i in knightMoves) {
    let arr = knightMoves[i];
    if (arr[0] >= 0 && arr[0] < 8 && arr[1] >= 0 && arr[1] < 8) {
      if (flag !== isNaN(String(board[arr[0]][arr[1]])[0]) &&
      (board[arr[0]][arr[1]] === 4 || board[arr[0]][arr[1]] === -4)) {
        path.push(arr);
        status = true;
        break;
      }
    }
  }
  
  // cek is check by pawn or not
  if(board[row-1][col+1] !== undefined) {
    if (board[row-1][col+1] !== 0 && (isNaN(String(board[row-1][col+1])[0]) !== flag) &&
    (board[row-1][col+1] === 6 || board[row-1][col+1] === -6)) {
      path.push([row-1, col+1])
      status = true;
    }
  }
  if(board[row-1][col-1] !== undefined) {
    if (board[row-1][col-1] !== 0 && (isNaN(String(board[row-1][col-1])[0]) !== flag) &&
    (board[row-1][col-1] === 6 || board[row-1][col-1] === -6)) {
      path.push([row-1, col-1])
      status = true;
    }
  }

  
  // cek is check by (rook or queen) or not
  for(let i = col + 1; i < board[row].length; i++) {
    if(board[row][i] === 0) continue;
    if(flag === isNaN(String(board[row][i])[0])) {
      break;
    } else if(flag !== isNaN(String(board[row][i])[0]) &&
    (board[row][i] === 5 || board[row][i] === -5 || board[row][i] === 2 || board[row][i] === -2)) {
      for(let j = i; j > col; j--) {
        path.push([row, j])
      };
      status = true;
      break
    } else {
      break;
    }
  }
  for(let i = col - 1; i >= 0; i--) {
    if(board[row][i] === 0) continue;
    if(flag === isNaN(String(board[row][i])[0])) {
      break;
    } else if(flag !== isNaN(String(board[row][i])[0]) &&
    (board[row][i] === 5 || board[row][i] === -5 || board[row][i] === 2 || board[row][i] === -2)) {
      for(let j = i; j < col; j++) {
        path.push([row, j])
      };
      status = true;
      break;
    } else {
      break;
    }
  }
  for(let i = row - 1; i >= 0; i--) {
    if(board[i][col] === 0) continue;
    if(flag === isNaN(String(board[i][col])[0])) {
      break;
    } else if(flag !== isNaN(String(board[i][col])[0]) &&
    (board[i][col] === 5 || board[i][col] === -5 || board[i][col] === 2 || board[i][col] === -2)) {
      for(let j = i; j < row; j++) {
        path.push(j, col);
      }
      status = true;
      break;
    } else {
      break;
    }
  }
  for(let i = row + 1; i < board.length; i++) {
    if(board[i][col] === 0) continue;
    if(flag === isNaN(String(board[i][col])[0])) {
      break;
    } else if(flag !== isNaN(String(board[i][col])[0]) &&
    (board[i][col] === 5 || board[i][col] === -5 || board[i][col] === 2 || board[i][col] === -2)) {
      for(let j = i; j > row; j--) {
        path.push(j, col);
      }
      status = true;
      break;
    } else {
      break;
    }
  }


  // cek is check by (bishop or queen) or not
  for(let i = row + 1, j = col + 1; i < board.length; i++, j++) {
    if(board[i][j] === 0) continue;
    if(flag === isNaN(String(board[i][j])[0])) {
      break;
    } else if(flag !== isNaN(String(board[i][j])[0]) &&
    (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
      for(let k = i, l = j; k > row; k--, l--) {
        path.push([k, l]);
      }
      status = true;
      break;
    } else {
      break;
    }
  }
  for(let i = row + 1, j = col - 1; i < board.length; i++, j--) {
    if(board[i][j] === 0) continue;
    if(flag === isNaN(String(board[i][j])[0])) {
      break;
    } else if(flag !== isNaN(String(board[i][j])[0]) &&
    (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
      for(let k = i, l = j; k > row; k--, l++) {
        path.push([k, l]);
      }
      status = true;
      break;
    } else {
      break;
    }
  }
  for(let i = row - 1, j = col - 1; i >= 0; i--, j--) {
    if(board[i][j] === 0) continue;
    if(flag === isNaN(String(board[i][j])[0])) {
      break;
    } else if(flag !== isNaN(String(board[i][j])[0]) &&
    (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
      for(let k = i, l = k; i < row; k++, l++) {
        path.push([k, l]);
      }
      status = true;
      break;
    } else {
      break;
    }
  }
  for(let i = row - 1, j = col + 1; i >= 0; i--, j++) {
    if(board[i][j] === 0) continue;
    if(flag === isNaN(String(board[i][j])[0])) {
      break;
    } else if(flag !== isNaN(String(board[i][j])[0]) &&
    (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
      for(let k = i, l = j; k < row; k++, l--) {
        path.push([k, l]);
      }
      status = true;
      break;
    } else {
      break;
    }
  }

  return {status, path, kingRow: row, kingCol: col};
}


export function isCheckMate(board, side, path, row, col) {  
  const flag = side === 'white' ? false : true;
  const kingMoves = legalKingMoves(board, row, col);
  let status = true;
  const target = path[0];
  
  if(kingMoves.length > 0) return false;

  // cek if there's pawn to save the king
  if(board[target[0]+1][target[1]+1] !== undefined) {
    if(isNaN(String(board[target[0]+1][target[1]+1])[0]) === flag &&
    (board[target[0]+1][target[1]+1] === 6 || board[target[0]+1][target[1]+1] === -6)) {
      return false;
    }
  }

  if (board[target[0]+1][target[1]-1] !== undefined) {
    if(isNaN(String(board[target[0]+1][target[1]-1])[0]) === flag &&
    (board[target[0]+1][target[1]-1] === 6 || board[target[0]+1][target[1]-1] === -6)) {
      return false;
    }
  }
  
  path.forEach(arr => {
    const knightMoves = [
      [arr[0]+2, arr[1]-1], [arr[0]+2, arr[1]+1],
      [arr[0]-2, arr[1]-1], [arr[0]-2, arr[1]+1],
      [arr[0]+1, arr[1]-2], [arr[0]-1, arr[1]-2],
      [arr[0]-1, arr[1]+2], [arr[0]+1, arr[1]+2]
    ];
    
    // cek if there's pawn to save the king
    if(arr[0]+2 < 7 && board[arr[0]+2][arr[1]] !== undefined) {
      if(arr[0] > 3 && board[arr[0]][arr[1]] === 0 &&
      isNaN(String(board[arr[0]+2][arr[1]])[0]) === flag &&
      (board[arr[0]+2][arr[1]] === 6 || board[arr[0]+2][arr[1]] === -6)) {
        status = false;
      }
    }

    if(board[arr[0]+1][arr[1]] !== undefined) {
      if(board[arr[0]][arr[1]] === 0 &&
      isNaN(String(board[arr[0]+1][arr[1]])[0]) === flag && 
      (board[arr[0]+1][arr[1]] === 6 || board[arr[0]+1][arr[1]] === -6)) {
        status = false;
      }
    }

    
    // cek if there's knight to save the king
    for(let i = 0; i < knightMoves.length; i++) {
      let move = knightMoves[i];
      if(move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8 &&
      isNaN(String(board[move[0]][move[1]])[0]) === flag &&
      (board[move[0]][move[1]] === 4 || board[move[0]][move[1]] === -4)) {
        status = false;
        return;
      }
    }

    // cek if there's bishop or queen to save the king
    for(let i = arr[0] + 1, j = arr[1] + 1; i < board.length && j < board.length; i++, j++) {
      if(isNaN(String(board[i][j])[0]) === flag && board[i][j] !== 0 &&
      (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
        status = false;
        return;
      } else if(board[i][j] !== 0) {
        break;
      }
    }
    for(let i = arr[0] + 1, j = arr[1] - 1; i < board.length && j <= 0; i++, j--) {
      if(isNaN(String(board[i][j])[0]) === flag && board[i][j] !== 0 &&
      (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
        status = false;
        return;
      }
      else if(board[i][j] !== 0) {
        break;
      }
    }
    for(let i = arr[0] - 1, j = arr[1] - 1; i >= 0 && j >= 0; i--, j--) {
      if(isNaN(String(board[i][j])[0]) === flag && board[i][j] !== 0 &&
      (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
        status = false;
        return;
      }
      else if(board[i][j] !== 0) {
        break;
      }
    }
    for(let i = arr[0] - 1, j = arr[1] + 1; i >= 0 && j < board.length; i--, j++) {
      if(isNaN(String(board[i][j])[0]) === flag && board[i][j] !== 0 &&
      (board[i][j] === 3 || board[i][j] === -3 || board[i][j] === 2 || board[i][j] === -2)) {
        status = false;
        return;
      }
      else if(board[i][j] !== 0) {
        break;
      }
    }

    // cek if there's rook or queen to save the king
    for(let i = arr[1] + 1; i < board[arr[0]].length; i++) {
      if(isNaN(String(board[arr[0]][i])[0]) === flag && board[arr[0]][i] !== 0 &&
      (board[arr[0]][i] === 2 || board[arr[0]][i] === -2 || board[arr[0]][i] === 5 || board[arr[0]][i] === -5)) {
        status = false;
        return;
      } else if(board[arr[0]][i] !== 0) {
        break;
      }
    }
    for(let i = arr[1] - 1; i >= 0; i--) {
      if(isNaN(String(board[arr[0]][i])[0]) === flag && board[arr[0]][i] !== 0 &&
      (board[arr[0]][i] === 2 || board[arr[0]][i] === -2 || board[arr[0]][i] === 5 || board[arr[0]][i] === -5)) {
        status = false;
        return;
      } else if(board[arr[0]][i] !== 0) {
        break;
      }
    }
    for(let i = arr[0] - 1; i >= 0; i--) {
      if(isNaN(String(board[i][arr[1]])[0]) === flag && board[i][arr[1]] !== 0 &&
      (board[i][arr[1]] === 2 || board[i][arr[1]] === -2 || board[i][arr[1]] === 5 || board[i][arr[1]] === -5)) {
        status = false;
        return;
      } else if(board[i][arr[1]] !== 0) {
        break;
      }
    }
    for(let i = arr[0] + 1; i < board.length; i++) {
      if(isNaN(String(board[i][arr[1]])[0]) === flag && board[i][arr[1]] !== 0 &&
      (board[i][arr[1]] === 2 || board[i][arr[1]] === -2 || board[i][arr[1]] === 5 || board[i][arr[1]] === -5)) {
        status = false;
        return;
      } else if(board[i][arr[1]] !== 0) {
        break;
      }
    }
  })

  return status;
}