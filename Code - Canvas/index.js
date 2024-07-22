let CurrentPlayer = "X";
let gameActive = false;
let playerX = "";
let playerO = "";

let options = ["", "", "", "", "", "", "", "", ""];

const startForm = document.getElementById("form");
const playerNameInputX = document.getElementById("playerNameX");
const playerNameInputO = document.getElementById("playerNameO");
const playerNameDiv = document.getElementById("playerNames");
const gameBoardDiv = document.getElementById("gameBoard");
const message = document.getElementById("message");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("resetBtn");

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
  playerX = playerNameInputX.value.trim() || "X";
  playerO = playerNameInputO.value.trim() || "O";

  startGame();
});

function startGame() {
  gameActive = true;
  document.querySelector(".startForm").style.display = "none";
  playerNameDiv.innerHTML = `<p>${playerX} (X) vs ${playerO} (O)</p>`;
  gameBoardDiv.style.display = "block";
  message.textContent = `${playerX}'s turn`;

  drawBoard();
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;

  for (let i = 1; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 100, 0);
    ctx.lineTo(i * 100, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * 100);
    ctx.lineTo(300, i * 100);
    ctx.stroke();
  }
}

canvas.addEventListener("click", function (event) {
  if (!gameActive) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const gridIndex = Math.floor(x / 100) + Math.floor(y / 100) * 3;

  if (options[gridIndex] !== "") return;

  gridUpdated(gridIndex);
});

function gridUpdated(index) {
  options[index] = CurrentPlayer;
  const x = (index % 3) * 100 + 50;
  const y = Math.floor(index / 3) * 100 + 50;

  ctx.font = "80px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(CurrentPlayer, x, y);

  checkWinner();
  if (gameActive) {
    changePlayer();
  }
}

function changePlayer() {
  CurrentPlayer = CurrentPlayer === "X" ? "O" : "X";
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
    message.textContent = `${CurrentPlayer == "X" ? playerX : playerO} Wins!`;

    alert(`${CurrentPlayer == "X" ? playerX : playerO} Wins!`);

    gameActive = false;
  } else if (!options.includes("")) {
    message.textContent = "Draw!";
    alert(`Match is Draw`);
    gameActive = false;
  }
}

function restartGame() {
  CurrentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  message.textContent = `${playerX}'s turn`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  gameActive = true;
}

restartBtn.addEventListener("click", restartGame);
