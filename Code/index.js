// let CurrentPlayer = "X";
// let gameActive = false;
// let playerX = "";
// let playerO = "";

// let options = ["", "", "", "", "", "", "", "", ""];

// // DOM Elements
// const startForm = document.getElementById("form");
// const playerNameInputX = document.getElementById("playerNameX");
// const playerNameInputO = document.getElementById("playerNameO");
// const playerNameDiv = document.getElementById("playerNames");
// const gameBoardDiv = document.getElementById("gameBoard");
// const message = document.getElementById("message");

// const grids = document.getElementById(".grid");
// // const restartBtn = document.getElementById(restartBtn);
// const winCondition = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// startForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   playerX = playerNameInputX.value.trim();
//   playerO = playerNameInputO.value.trim();

//   // playerX = playerNameInputX.value.trim() || 'X';
//   // playerO = playerNameInputO.value.trim() || 'O';

//   // startGame();

//   if (playerX && playerO) {
//     startGame();
//   } else {
//     alert("Please enter a name for both players");
//   }
// });

// function startGame() {
//   gameActive = true;
//   document.querySelector(".startForm").style.display = "none";
//   playerNameDiv.innerHTML = `<p>${playerX} (X) vs ${playerO} (O)</p>`;
//   gameBoardDiv.style.display = "block";
//   message.textContent = `${playerX}'s turn`;

//   initializeGame();
// }

// function initializeGame() {
//   grids.foreach(grid => grid.addEventListener("click", gridTriggered));
//   restartBtn.addEventListener("click", restartBtn);
// }

// function gridTriggered() {
//   const gridIndex = this.getAttribute("grid_index");

//   if (options[gridIndex] !== "" || !gameActive) {
//     return;
//   }

//   gridUpdated(this, gridIndex);
//   checkWinner();
// }

// function gridUpdated(grid, index) {
//   options[index] = CurrentPlayer;
//   grid.textContent = CurrentPlayer;
//   changePlayer();
// }

// function changePlayer() {
//   CurrentPlayer = CurrentPlayer === "X" ? "O" : "X";
//   message.textContent = `${CurrentPlayer}'s turn`;
// }

// function checkWinner() {
//   let roundWon = false;
//   for (let i = 0; i < winCondition.length; i++) {
//     const condition = winCondition[i];
//     const gridA = options[condition[0]];
//     const gridB = options[condition[1]];
//     const gridC = options[condition[2]];

//     if (grid === "" || gridB === "" || gridC === "") {
//       continue;
//     }

//     if (grid === gridB && gridB === gridC) {
//       roundWon = true;
//       break;
//     }
//   }

//   if (roundWon) {
//     message.textContent = `${CurrentPlayer === "X" ? playerO : playerX} Wins!`;
//     gameActive = false;
//   } else if (!options.includes("")) {
//     message.textContent = "Draw!";
//     gameActive = false;
//   }
//   else{
//     changePlayer();
//   }
// }


// function restartBtn(){
//     CurrentPlayer= "X";
//     options = ["", "", "", "", "", "", "", "", ""];
//     message.textContent = `${CurrentPlayer}'s turn`;
//     grid.foreach(grid => grid.textContent = "");
//     gameActive = true;
// }

let CurrentPlayer = "X";
let gameActive = false;
let playerX = "";
let playerO = "";

let options = ["", "", "", "", "", "", "", "", ""];

// DOM Elements
const startForm = document.getElementById("form");
const playerNameInputX = document.getElementById("playerNameX");
const playerNameInputO = document.getElementById("playerNameO");
const playerNameDiv = document.getElementById("playerNames");
const gameBoardDiv = document.getElementById("gameBoard");
const message = document.getElementById("message");

const grids = document.querySelectorAll(".grid");
const restartBtn = document.getElementById("restartBtn");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startForm.addEventListener("submit", function (event) {
  event.preventDefault();
  playerX = playerNameInputX.value.trim() || 'X';
  playerO = playerNameInputO.value.trim() || 'O';

  startGame();
});

function startGame() {
  gameActive = true;
  document.querySelector(".startForm").style.display = "none";
  playerNameDiv.innerHTML = `<p>${playerX} (X) vs ${playerO} (O)</p>`;
  gameBoardDiv.style.display = "block";
  message.textContent = `${playerX}'s turn`;

  initializeGame();
}

function initializeGame() {
  grids.forEach(grid => grid.addEventListener("click", gridTriggered));
  restartBtn.addEventListener("click", restartGame);
}

function gridTriggered() {
  const gridIndex = this.getAttribute("grid_index");

  if (options[gridIndex] !== "" || !gameActive) {
    return;
  }

  gridUpdated(this, gridIndex);
  checkWinner();
}

function gridUpdated(grid, index) {
  options[index] = CurrentPlayer;
  grid.textContent = CurrentPlayer;
}

function changePlayer() {
  CurrentPlayer = CurrentPlayer == "X" ? "O" : "X";
  message.textContent = `${CurrentPlayer === "X" ? playerX : playerO}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const gridA = options[condition[0]];
    const gridB = options[condition[1]];
    const gridC = options[condition[2]];

    if (gridA === "" || gridB === "" || gridC === "") {
      continue;
    }

    if (gridA === gridB && gridB === gridC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.textContent = `${CurrentPlayer === "X" ? playerX : playerO} Wins!`;
    gameActive = false;
  } else if (!options.includes("")) {
    message.textContent = "Draw!";
    gameActive = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  CurrentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  message.textContent = `${playerX}'s turn`;
  grids.forEach(grid => grid.textContent = "");
  gameActive = true;
}

// Ensure the DOM is fully loaded before initializing the game
document.addEventListener("DOMContentLoaded", () => {
  grids.forEach(grid => grid.addEventListener("click", gridTriggered));
  restartBtn.addEventListener("click", restartGame);
});
