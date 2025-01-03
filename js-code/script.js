
// Store the gameboard as an array inside a GameBoard object

const GameBoard = (function() {
  const board = [];
  const BoardSize = 3;
  let currentPlayer = "X";
  createBoard();
  
  function createBoard() {
    for (let i = 0; i < BoardSize; i++) {
      board[i] = [];
      for (let j = 0; j < BoardSize; j++) {
        board[i].push(Cell().getValue());
      }
    }
  }

 const resetBoard = () => {
  board.length = 0;
  createBoard();
  currentPlayer =  "X";
  console.log("new game started");
  return board;
 }

  const getBoard = () => board;

  const isValidPosition = (row, colum) => {
    return row >= 0 && row < BoardSize && colum >= 0 && colum < BoardSize; 
  }

  function togglePlayer() {
     return currentPlayer = currentPlayer === "X" ? "O" : "X";
  }


  function addValue(row, colum) {

    if (isValidPosition(row, colum)) {
      
      if (board[row][colum] === ' ') {
        board[row][colum] = currentPlayer;
        const lastPlayer = currentPlayer;
        console.log(checkForGameOver(lastPlayer));
        togglePlayer();
      } else if (board[row][colum] !== ' ') {
        board[row][colum] = currentPlayer;
        console.log("cant mark the same row twcie")
      } 

    } else return "Try inside the board"
    
    return board;
  }
  
  function checkForGameOver(lastPlayer) {
    for (let i = 0; i < board.length; i++ ) {
      if (
        board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' '
      ) {
        console.log('checking row',i , board[i])
        return  `row win, winner ${lastPlayer}`;
      } else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' '){
        return  `colum winner ${lastPlayer}`;
      }
    }
    
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
      return `diagonal win(top left to bottom right winner ${lastPlayer}`
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
      return `diagonal win( top right to bottom left winner ${lastPlayer}` 
    }

    const isBoardFull = board.every(row => row.every(cell => cell !== ' '));
    if (isBoardFull) return "Is' a Draw"

    return "game is on"
  }
  

  return {
    getBoard,
    addValue,
    checkForGameOver,
    resetBoard
  }
})()

function Cell() {
  let value = " ";
  
  const getValue = () => value;
  
  return {
    getValue,
  }
}

console.log(GameBoard.getBoard());
console.log(GameBoard.addValue(1, 2));
console.log(GameBoard.addValue(2, 2));
console.log(GameBoard.addValue(0, 0));
console.log(GameBoard.addValue(1, 0));
console.log(GameBoard.addValue(2, 0));
console.log(GameBoard.addValue(0, 2));
console.log(GameBoard.addValue(2, 1));
console.log(GameBoard.addValue(0, 1));
console.log(GameBoard.addValue(1, 1));
console.log(GameBoard.resetBoard());
console.log(GameBoard.getBoard());
console.log(GameBoard.addValue(1, 1));
console.log(GameBoard.addValue(1, 0));
























