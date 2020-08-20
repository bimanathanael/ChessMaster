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
    console.log(String(board[i][col])[0])
    if(board[i][col] === 0) {
      legalMoves.push([i, col]);
    } else {
      if(flag !== isNaN(String(board[i][col])[0])) legalMoves.push([i, col]);
      break;
    }
  }

  for(let i = row + 1; i < board.length; i++) {
    console.log(String(board[i][col])[0])
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
  // can move diagonal if diagonal target (is not empty && is opponent side)
  if (board[row-1][col+1] !== 0 && (isNaN(String(board[row-1][col+1])[0]) !== flag)) legalMoves.push([row-1, col+1]);
  if (board[row-1][col-1] !== 0 && (isNaN(String(board[row-1][col-1])[0]) !== flag)) legalMoves.push([row-1, col-1]);
  
  return legalMoves;
}


export function legalWhitePawnMoves(board, row, col) {
  let legalMoves = [];
  const flag = isNaN(String(board[row][col])[0]);

  if (row === 1) {
    for(let i = row + 1; i < row + 3; i++) {
      if (board[i][col] === 0) legalMoves.push([i, col]);
      else break
    }
  } else {
    if (board[row+1][col] === 0) legalMoves = [[row+1, col]];
  }
  // can move diagonal if diagonal target (is not empty && is opponent side)
  if (board[row+1][col+1] !== 0 && (isNaN(String(board[row+1][col+1])[0]) !== flag)) legalMoves.push([row+1, col+1]);
  if (board[row+1][col-1] !== 0 && (isNaN(String(board[row+1][col-1])[0]) !== flag)) legalMoves.push([row+1, col-1]);

  return legalMoves;
}


export function legalKingMoves(board, row, col) {
  const flag = isNaN(String(board[row][col])[0]);
  
  let legalMoves = [
    [row+1, col-1], [row+1, col], [row+1, col+1],
    [row, col-1], [row, col+1],
    [row-1, col-1], [row-1, col], [row-1, col+1]
  ]

  legalMoves.forEach(arr => {
    if (arr[0] > 0 && arr[0] < 8 && arr[1] > 0 && arr[1] < 8) {
      if (flag === isNaN(String(board[arr[0]][arr[1]])[0])) {
        legalMoves = legalMoves.filter(e => e !== arr);
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
    if (arr[0] > 0 && arr[0] < 8 && arr[1] > 0 && arr[1] < 8) {
      if (flag === isNaN(String(board[arr[0]][arr[1]])[0])) {
        legalMoves = legalMoves.filter(e => e !== arr);
      }
    }
  });
  
  return legalMoves;
}