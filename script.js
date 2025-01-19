const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restartBtn");
const alertBox = document.querySelector(".alertBox");

// Variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1 : ${currentPlayer}`;
player2.textContent = `Player 2 : ${nextPlayer}`;

// Start the game
const startGame = () => {
  gameCells.forEach(cell => {
    cell.textContent = ''; // Clear cells
    cell.classList.remove("disabled"); // Remove disabled class
    cell.addEventListener("click", handleClick, { once: true }); // Add event listener once
  });
  playerTurn = currentPlayer; // Reset playerTurn
};

// Handle cell click
const handleClick = (e) => {
  if (e.target.textContent === '') {
    e.target.textContent = playerTurn;
    if (checkWin()) {
      showAlert(`${playerTurn} is a winner!`);
      disableCells();
    } else if (checkTie()) {
      showAlert(`It's a Tie!`);
      disableCells();
    } else {
      changePlayerTurn();
    }
  }
};

// Change player's turn
const changePlayerTurn = () => {
  playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
};

// Check if there's a winner
const checkWin = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], // Corrected diagonal condition
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [pos1, pos2, pos3] = winningConditions[i];
    if (
      gameCells[pos1].textContent !== '' &&
      gameCells[pos1].textContent === gameCells[pos2].textContent &&
      gameCells[pos2].textContent === gameCells[pos3].textContent
    ) {
      return true;
    }
  }
  return false;
};

// Check if the game is a tie
const checkTie = () => {
  return [...gameCells].every(cell => cell.textContent !== '') && !checkWin();
};

// Disable all cells
const disableCells = () => {
  gameCells.forEach(cell => {
    cell.removeEventListener("click", handleClick);
    cell.classList.add("disabled");
  });
};

// Restart the game
const restartGame = () => {
  startGame();
  showAlert("Game Restarted!");
};

// Show alert message
const showAlert = (msg) => {
  alertBox.textContent = msg;
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
};

// Event listener for restart button
restartBtn.addEventListener("click", restartGame);

// Initialize the game
startGame();
