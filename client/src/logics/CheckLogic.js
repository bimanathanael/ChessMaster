export function getKingPosition(board, side) {
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
  if(board[row-1][col+1]) {
    if (board[row-1][col+1] !== 0 && (isNaN(String(board[row-1][col+1])[0]) !== flag) &&
    (board[row-1][col+1] === 6 || board[row-1][col+1] === -6)) {
      path.push([row-1, col+1])
      status = true;
    }
  }
  if(board[row-1][col-1]) {
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