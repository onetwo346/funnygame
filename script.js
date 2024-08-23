const cells = document.querySelectorAll("[data-cell]");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const quitBtn = document.getElementById("quitBtn");
const colorXInput = document.getElementById("colorX");
const colorOInput = document.getElementById("colorO");
const applyColorsBtn = document.getElementById("applyColors");

let isXNext = true;
let gameActive = true;
let colorX = colorXInput.value;
let colorO = colorOInput.value;

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

function drawSymbol(event) {
  if (!gameActive) return;

  const cell = event.target;
  if (cell.classList.contains("X") || cell.classList.contains("O")) return;

  const currentClass = isXNext ? "X" : "O";
  cell.classList.add(currentClass);
  cell.style.color = isXNext ? colorX : colorO;
  cell.textContent = currentClass; // Add symbol to cell

  if (checkWin(currentClass)) {
    statusDisplay.innerText = `${currentClass} Wins!`;
    gameActive = false;
    return;
  }

  if (
    [...cells].every(
      (cell) => cell.classList.contains("X") || cell.classList.contains("O")
    )
  ) {
    statusDisplay.innerText = "Draw!";
    gameActive = false;
    return;
  }

  isXNext = !isXNext;
  statusDisplay.innerText = `Player ${isXNext ? "X" : "O"}'s turn`;
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function restartGame() {
  isXNext = true;
  gameActive = true;
  statusDisplay.innerText = `Player X's turn`;
  cells.forEach((cell) => {
    cell.classList.remove("X", "O");
    cell.textContent = ""; // Clear symbol
    cell.style.color = ""; // Reset color
  });
}

function quitGame() {
  if (confirm("Are you sure you want to quit?")) {
    window.close(); // Note: `window.close()` might not work in all browsers or might require user confirmation.
  }
}

function applyColors() {
  colorX = colorXInput.value;
  colorO = colorOInput.value;
  // Apply colors to cells based on current player
  cells.forEach((cell) => {
    if (cell.classList.contains("X")) {
      cell.style.color = colorX;
    } else if (cell.classList.contains("O")) {
      cell.style.color = colorO;
    }
  });
}

// Add event listeners
cells.forEach((cell) => cell.addEventListener("mousedown", drawSymbol));
cells.forEach((cell) => cell.addEventListener("touchstart", drawSymbol));

restartBtn.addEventListener("click", restartGame);
quitBtn.addEventListener("click", quitGame);
applyColorsBtn.addEventListener("click", applyColors);

// Apply initial colors
applyColors();
