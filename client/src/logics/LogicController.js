import {
  legalDiagonalMoves, legalHorVerMoves,
  legalBlackPawnMoves, legalWhitePawnMoves,
  legalKingMoves
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
    case -5:
    case 5:
      legalMoves = legalHorVerMoves(board, row, col);
      break;
    case 6:
      legalMoves = legalWhitePawnMoves(board, row, col);
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

  for(const i in legalMoves) {
    console.log(legalMoves, `[${row}, ${col}]`)
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