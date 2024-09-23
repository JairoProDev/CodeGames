let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

// Referencias a los elementos del DOM
const gameBoard = document.getElementById('game-board');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Combinaciones ganadoras
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Función para crear el tablero de juego
function createBoard() {
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cellElement);
  });
}

// Función para manejar el clic en una celda
function handleCellClick() {
  const cellIndex = this.dataset.index;

  // Si la celda ya fue ocupada o el juego terminó, no hacer nada
  if (board[cellIndex] !== '' || isGameOver) return;

  board[cellIndex] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add('taken');

  checkGameStatus();
}

// Función para revisar el estado del juego (ganador, empate o sigue jugando)
function checkGameStatus() {
  const winner = checkForWinner();

  if (winner) {
    messageDisplay.textContent = `¡Jugador ${winner} ha ganado!`;
    isGameOver = true;
    resetButton.classList.remove('hidden');
    return;
  }

  if (board.every(cell => cell !== '')) {
    messageDisplay.textContent = '¡Es un empate!';
    isGameOver = true;
    resetButton.classList.remove('hidden');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messageDisplay.textContent = `Turno del jugador ${currentPlayer}`;
}

// Función para verificar si hay un ganador
function checkForWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

// Función para reiniciar el juego
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  messageDisplay.textContent = `Turno del jugador ${currentPlayer}`;
  resetButton.classList.add('hidden');
  createBoard();
}

// Inicializa el juego
createBoard();
messageDisplay.textContent = `Turno del jugador ${currentPlayer}`;

// Eventos
resetButton.addEventListener('click', resetGame);
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && resetButton.classList.contains('hidden')) {
    resetGame();
  }
});
