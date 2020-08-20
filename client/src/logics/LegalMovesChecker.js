export function legalHorVerMoves(board, row, col) {
  let legalMoves = [];

  // cek legal horizontal movements
  for(let i = col + 1; i < board[row].length; i++) {
    if(board[row][i] === 0) {
      legalMoves.push([row, i]);
    } else {
      legalMoves.push([row, i]);
      break;
    }
  }

  for(let i = col - 1; i >= 0; i--) {
    if(board[row][i] === 0) {
      legalMoves.push([row, i]);
    } else {
      legalMoves.push([row, i]);
      break;
    }
  }

  // cek legal vertical movements
  for(let i = row - 1; i >= 0; i--) {
    if(board[i][col] === 0) {
      legalMoves.push([i, col]);
    } else {
      legalMoves.push([i, col]);
      break;
    }
  }

  for(let i = row + 1; i < board.length; i++) {
    if(board[i][col] === 0) {
      legalMoves.push([i, col]);
    } else {
      legalMoves.push([i, col]);
      break;
    }
  }

  return legalMoves;
}


export function legalDiagonalMoves(board, row, col) {
  let legalMoves = [];

  // cek legal diagonal-up movements
  for(let i = row + 1, j = col + 1; i < board.length; i++) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      legalMoves.push([i, j]);
      break;
    }
    j++;
  }

  for(let i = row + 1, j = col - 1; i < board.length; i++) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      legalMoves.push([i, j]);
      break;
    }
    j--;
  }

  // cek legal diagonal-down movements
  for(let i = row - 1, j = col - 1; i >= 0; i--) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      legalMoves.push([i, j]);
      break;
    }
    j--;
  }

  for(let i = row - 1, j = col + 1; i >= 0; i--) {
    if(board[i][j] === 0) {
      legalMoves.push([i, j]);
    } else {
      legalMoves.push([i, j]);
      break;
    }
    j++;
  }

  return legalMoves;
}


export function legalBlackPawnMoves(board, row, col) {
  let legalMoves = [];

  if (row === 6) {
    for(let i = row - 1; i > row - 3; i--) {
      if (board[i][col] === 0) legalMoves.push([i, col]);
      else break
    }
  } else {
    legalMoves = [[row-1, col]];
  }
  
  return legalMoves;
}

export function legalWhitePawnMoves(board, row, col) {
  let legalMoves = [];

  if (row === 1) {
    for(let i = row + 1; i < row + 3; i++) {
      if (board[i][col] === 0) legalMoves.push([i, col]);
      else break
    }
  } else {
    legalMoves = [[row+1, col]];
  }

  return legalMoves;
}

export function legalKingMoves(__, row, col) {
  const legalMoves = [
    [row+1, col-1], [row+1, col], [row+1, col+1],
    [row, col-1], [row, col+1],
    [row-1, col-1], [row-1, col], [row-1, col+1]
  ]
  
  return legalMoves;
}