
// Store the gameboard as an array inside a GameBoard object

const GameBoard = (function() {
  const board = [];
  const boardSize = 3;
  let currentPlayer = "X";
  let gameOver = false;
  createBoard();
  
  function createBoard() {
    for (let i = 0; i < boardSize; i++) {
      board[i] = [];
      for (let j = 0; j < boardSize; j++) {
        board[i].push(Cell().getValue());
      }
    }
  }

 const resetBoard = () => {
  board.length = 0;
  createBoard();
  currentPlayer =  "X";
  gameOver = false;
  console.log("new game started");
  return board;
 }

  const getBoard = () => board;

  const isValidPosition = (row, column) => {
    return row >= 0 && row < boardSize && column >= 0 && column < boardSize; 
  }

  function togglePlayer() {
     return currentPlayer = currentPlayer === "X" ? "O" : "X";
  }


  function addValue(row, column) {
    if (gameOver) {
      return  `Game is over.  Please reset the board to play again.`;
    }

    if (isValidPosition(row, column)) {
      if (board[row][column] === ' ') {
        board[row][column] = currentPlayer;
        const lastPlayer = currentPlayer;
        const result = checkForGameOver(lastPlayer);

        if (result !== "Game is ongoing") {
          console.log(result);
        }

        togglePlayer();
      } else {
        return "Cell is already taken";
      } 
      
    } else return "Invalid position."
    
    return board;
  }
  
  function checkForGameOver(lastPlayer) {

    function checkForEqualConditions(value1, value2, value3) {
      if (value1 === value2 && value2 === value3  && value1 !== ' ') {
        return true;
      } else return false;
    }

    for (let i = 0; i < board.length; i++ ) {
      if (
        checkForEqualConditions(board[i][0], board[i][1], board[i][2]) || checkForEqualConditions(board[0][i], board[1][i], board[2][i]) 
      ) {
        gameOver = true;
        return  `Player ${lastPlayer} Wins. Please reset to start a new game.`
      }
      // if (
      //   board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' '
      // ) {
      //   gameOver = true;
      //   return  `Player ${lastPlayer} Wins. Please reset to start a new game. `;

      // } else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' '){
      //   gameOver = true;
      //   return  `Player ${lastPlayer} Wins. Please reset to start a new game. `;
      // }
    }
   
    //check for diagnal win
    if (checkForEqualConditions(board[0][0], board[1][1], board[2][2] || checkForEqualConditions(board[0][2], board[1][1], board[0][2]))) {
      gameOver = true;
      return `Player ${lastPlayer} Wins. Please reset to start a new game.`;
    }
    // if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
    //   gameOver = true;
    //   return `Player ${lastPlayer} Wins. Please reset to start a new game. `;
    // }

    // if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
    //   gameOver = true;
    //   return `Player ${lastPlayer} Wins. Please reset to start a new game. `; 
    // }

    const isBoardFull = board.every(row => row.every(cell => cell !== ' '));
    if (isBoardFull) {
      gameOver = true;
      return "Is' a Draw! Please reset to start a new game.";
    } 

    return "Game is ongoing";
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
console.log(GameBoard.addValue(2, 0));
console.log(GameBoard.addValue(2, 2));
console.log(GameBoard.addValue(0, 0));
console.log(GameBoard.addValue(1, 2));
console.log(GameBoard.addValue(1, 0));
console.log(GameBoard.addValue(1, 1));
console.log(GameBoard.resetBoard());
console.log(GameBoard.addValue(2, 2));
console.log(GameBoard.addValue(2, 1));
console.log(GameBoard.addValue(0, 2));
console.log(GameBoard.addValue(0, 1));
console.log(GameBoard.addValue(2, 0));
console.log(GameBoard.addValue(1, 1));
console.log(GameBoard.addValue(1, 2));
console.log(GameBoard.addValue(1, 1));
console.log(GameBoard.resetBoard());
console.log(GameBoard.addValue(0, 0));
console.log(GameBoard.addValue(0, 1));
console.log(GameBoard.addValue(0, 2));
console.log(GameBoard.addValue(2, 2));
console.log(GameBoard.addValue(1, 1));
console.log(GameBoard.addValue(1, 2));
console.log(GameBoard.addValue(2, 1));
console.log(GameBoard.addValue(2, 0));
console.log(GameBoard.addValue(1, 0));
console.log(GameBoard.addValue(1, 0));
console.log(GameBoard.resetBoard());
console.log(GameBoard.addValue(0, 0));
console.log(GameBoard.addValue(1, 2));
console.log(GameBoard.addValue(1, 1));
console.log(GameBoard.addValue(2, 1));
console.log(GameBoard.addValue(2, 2));
console.log(GameBoard.addValue(2, 2));


























