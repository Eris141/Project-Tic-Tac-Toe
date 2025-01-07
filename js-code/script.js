
// Store the gameboard as an array inside a GameBoard object

const GameBoard = (function() {
  const board = [];
  const boardSize = 3;
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
  return board;
 }

  const getBoard = () => board;

  const isValidPosition = (row, column) => {
    return row >= 0 && row < boardSize && column >= 0 && column < boardSize; 
  }

  function addValue(row, column, playerMark) {
    board[row][column] = playerMark;
  }

  const isBoardFull =  () => board.every(row => row.every(cell => cell !== ' '));
    

  return {
    getBoard,
    addValue,
    resetBoard,
    isValidPosition,
    isBoardFull
  }
})()

function Cell() {
  let value = " ";
  
  const getValue = () => value;
  
  return {
    getValue,
  }
}

function GameController() {
  let currentPlayer = "X";
  let gameOver = false;
  const board = GameBoard.getBoard();
  let players = {X: "Player 1", O: "Player 2"}; 
  const getCurrentPlayer = () => currentPlayer;

  function initializePlayers(playerXName, playerOName) {
    players.X = playerXName || "Player 1";
    players.O = playerOName || "Player 2";
  }

  const reset = () => {
    GameBoard.resetBoard();
    currentPlayer = "X";
    gameOver = false;
  };

  function togglePlayer() {
    return currentPlayer = currentPlayer === "X" ? "O" : "X";
 }

 const winPlayerMessage = (lastPlayer) => {
  return `${players[lastPlayer]} Wins!`
}

function checkForGameOver(lastPlayer) {

 function checkForEqualConditions(value1, value2, value3) {
   return value1 === value2 && value2 === value3 && value1 !== ' ';
 }

 for (let i = 0; i < board.length; i++ ) {
   if (
     checkForEqualConditions(board[i][0], board[i][1], board[i][2]) || checkForEqualConditions(board[0][i], board[1][i], board[2][i]) 
   ) {
     gameOver = true;
     return winPlayerMessage(lastPlayer);
   }
 }

 //check for diagnal win
 if (checkForEqualConditions(board[0][0], board[1][1], board[2][2]) || checkForEqualConditions(board[0][2], board[1][1], board[2][0])) {
   gameOver = true;
   return winPlayerMessage(lastPlayer);
 }
 
 const isBoardFull = GameBoard.isBoardFull();
 if (isBoardFull) {
   gameOver = true;
   return "It's a Draw!";
 } 

 return "Game is ongoing";
}

function playGame(row, column) {
  if (gameOver) {
    return "RESTART TO PLAY";
  };

  if (GameBoard.isValidPosition(row, column)) {
    if (board[row][column] === ' ') {
      GameBoard.addValue(row, column, currentPlayer);
      const lastPlayer = currentPlayer;
      let result = checkForGameOver(lastPlayer);
  
      if (result === "Game is ongoing") {
        togglePlayer();
        return result;
      }
      return result;
    } else {
      return "Cell is already taken!!";
      }
    } else {
      console.log("invalid input")
    }
  }

  return {
    playGame,
    reset,
    initializePlayers,
    getCurrentPlayer,
    winPlayerMessage

  };
}

const game = GameController();

function displayBoard() {
  
  const messageDiv = document.querySelector('.game-message');
  // messageDiv.textContent = "GAME START!!" if
  const restartGame = document.querySelector('.reset-button');
  const startGameButton = document.querySelector('.start-game-button');
  const playerOneStatus = document.querySelector(".player1-status");
  const playerTwoStatus = document.querySelector(".player2-status");
  playerOneStatus.textContent = `(X) Name:`;
  playerTwoStatus.textContent = `(O) Name:`;
  
  
  startGameButton.addEventListener("click", () => {
    const player1Name = document.querySelector(".player1-name").value || "Player 1";
    const player2Name = document.querySelector(".player2-name").value || "Player 2";
    playerOneStatus.textContent = `(X) Name: ${player1Name}`;
    playerTwoStatus.textContent = `(O) Name: ${player2Name}`;

    

    game.initializePlayers(player1Name, player2Name);
    // Update the game status
    messageDiv.textContent = `${player1Name}' Turn (X)`;
    
    game.reset();
    renderBoard();
    document.querySelector(".player1-name").value = "";
    document.querySelector(".player2-name").value = "";
  });
  
  restartGame.addEventListener("click", () => {
    game.reset();
    renderBoard();
    messageDiv.textContent = "Game Reset. Player X starts!"
  })
  function renderBoard() {
    const gameboard = GameBoard.getBoard();
    const gameboardDiv = document.getElementById("gameboard");
    
    gameboardDiv.innerHTML = "";
    gameboard.forEach((rowArray, row) => 
      rowArray.forEach((cellValue, column) => {
        const cell = document.createElement("button");
        cell.textContent = cellValue;
        cell.setAttribute("data-index", `${row}-${column}`);
        cell.classList.add("cell");
        gameboardDiv.appendChild(cell);
        
        
        cell.addEventListener("click",() => {
          const result = game.playGame(row, column);
          messageDiv.textContent = result;
          if (messageDiv.textContent.match(/Win/g)) {
             messageDiv.classList.add("win-state");
          } else {
            messageDiv.classList.remove("win-state");
          }
        renderBoard(); // Re-render after each move
      })
    }
  ));}
  
  return {
    renderBoard
  }
}

const displayGame =  displayBoard().renderBoard();






