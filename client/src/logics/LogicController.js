import {
  legalDiagonalMoves, legalHorVerMoves,
  legalBlackPawnMoves,
  legalKingMoves, legalKnightMoves
} from './LegalMovesChecker';

export function defineLegalMoves(board, row, col, val) {
  let legalMoves = [];
  
  switch (val) {
    case -1:
    case 1:
      legalMoves = legalKingMoves(board, row, col);
      break;
    case -2:
    case 2:
      const legalMovesHV = legalHorVerMoves(board, row, col);
      const legalMovesD = legalDiagonalMoves(board, row, col);
      legalMoves = legalMovesHV.concat(legalMovesD);
      break;
    case -3:
    case 3:
      legalMoves = legalDiagonalMoves(board, row, col);
      break;
    case -4:
    case 4:
      legalMoves = legalKnightMoves(board, row, col);
      break;
    case -5:
    case 5:
      legalMoves = legalHorVerMoves(board, row, col);
      break;
    case 6:
      legalMoves = legalBlackPawnMoves(board, row, col);
      break;
    case -6:
      legalMoves = legalBlackPawnMoves(board, row, col);
      break;
    default:
      break;
  }

  return legalMoves;
}


export function moveValidation(board, temp, row, col, legalMoves) {
  let flag = false;

  // validate move target is in legalMoves
  for(const i in legalMoves) {
    if(legalMoves[i][0] === row && legalMoves[i][1] === col) {
      flag = true;
      break;
    }
  }

  if (flag) {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = temp[2];
    newBoard[temp[0]][temp[1]] = 0;
    return newBoard;
  }
}


export function isCheckMate(board, side, path, row, col) {
  
  const flag = side === 'white' ? false : true;
  const kingMoves = legalKingMoves(board, row, col);
  let status = true;
  const target = path[0];
  
  if(kingMoves.length > 0) return false;

  // cek if there's pawn to save the king
  if(board[target[0]+1][target[1]+1]) {
    if(isNaN(String(board[target[0]+1][target[1]+1])[0]) === flag &&
    (board[target[0]+1][target[1]+1] === 6 || board[target[0]+1][target[1]+1] === -6)) {
      return false;
    }
  }

  if (board[target[0]+1][target[1]-1]) {
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
    if(arr[0]+2 < 7) {
      if(arr[0] > 3 && board[arr[0]][arr[1]] === 0 &&
      isNaN(String(board[arr[0]+2][arr[1]])[0]) === flag &&
      (board[arr[0]+2][arr[1]] === 6 || board[arr[0]+2][arr[1]] === -6)) {
        status = false;
      }
    }

    if(board[arr[0]][arr[1]]) {
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