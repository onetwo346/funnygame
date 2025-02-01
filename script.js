const cells = document.querySelectorAll("[data-cell]");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const quitBtn = document.getElementById("quitBtn");
const colorXInput = document.getElementById("colorX");
const colorOInput = document.getElementById("colorO");
const applyColorsBtn = document.getElementById("applyColors");
const startBtn = document.getElementById("startBtn");
const descriptionPage = document.getElementById("descriptionPage");
const gamePage = document.getElementById("gamePage");
const modeSelect = document.getElementById("modeSelect");

let isXNext = true;
let gameActive = true;
let colorX = colorXInput.value;
let colorO = colorOInput.value;
let isAIMode = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start Game Button
startBtn.addEventListener("click", () => {
  descriptionPage.style.display = "none";
  gamePage.style.display = "block";
});

// Mode Selector
modeSelect.addEventListener("change", (e) => {
  isAIMode = e.target.value === "ai";
  restartGame();
});

// Draw Symbol
function drawSymbol(event) {
  if (!gameActive) return;

  const cell = event.target;
  if (cell.classList.contains("X") || cell.classList.contains("O")) return;

  const currentClass = isXNext ? "X" : "O";
  cell.classList.add(currentClass);
  cell.style.color = isXNext ? colorX : colorO;
  cell.textContent = currentClass;

  if (checkWin(currentClass)) {
    statusDisplay.innerText = `${currentClass} Wins!`;
    gameActive = false;
    showBalloons();
    return;
  }

  if ([...cells].every((cell) => cell.classList.contains("X") || cell.classList.contains("O"))) {
    statusDisplay.innerText = "Draw!";
    gameActive = false;
    return;
  }

  isXNext = !isXNext;
  statusDisplay.innerText = `Player ${isXNext ? "X" : "O"}'s turn`;

  // AI Move
  if (isAIMode && !isXNext && gameActive) {
    setTimeout(makeAIMove, 500);
  }
}

// AI Move Logic
function makeAIMove() {
  const emptyCells = [...cells].filter((cell) => !cell.classList.contains("X") && !cell.classList.contains("O"));
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.click();
  }
}

// Check Win
function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// Restart Game
function restartGame() {
  isXNext = true;
  gameActive = true;
  statusDisplay.innerText = `Player X's turn`;
  cells.forEach((cell) => {
    cell.classList.remove("X", "O");
    cell.textContent = "";
    cell.style.color = "";
  });
  removeBalloons();
}

// Quit Game
function quitGame() {
  if (confirm("Are you sure you want to quit?")) {
    window.close();
  }
}

// Apply Colors
function applyColors() {
  colorX = colorXInput.value;
  colorO = colorOInput.value;
  cells.forEach((cell) => {
    if (cell.classList.contains("X")) {
      cell.style.color = colorX;
    } else if (cell.classList.contains("O")) {
      cell.style.color = colorO;
    }
  });
}

// Balloons Animation
function showBalloons() {
  const balloonContainer = document.createElement("div");
  balloonContainer.classList.add("balloon-container");
  for (let i = 0; i < 5; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloonContainer.appendChild(balloon);
  }
  document.body.appendChild(balloonContainer);
}

function removeBalloons() {
  const balloonContainer = document.querySelector(".balloon-container");
  if (balloonContainer) {
    balloonContainer.remove();
  }
}

// Event Listeners
cells.forEach((cell) => cell.addEventListener("click", drawSymbol));
restartBtn.addEventListener("click", restartGame);
quitBtn.addEventListener("click", quitGame);
applyColorsBtn.addEventListener("click", applyColors);
