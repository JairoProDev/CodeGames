const player = document.getElementById('player');
const goal = document.getElementById('goal');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Configuración de la cuadrícula
let playerPosition = { row: 1, column: 1 };
const goalPosition = { row: 5, column: 5 };
const walls = [
  { row: 1, column: 2 },
  { row: 2, column: 2 },
  { row: 2, column: 3 },
  { row: 3, column: 4 },
  { row: 4, column: 4 },
  { row: 4, column: 1 },
  { row: 5, column: 1 },
];

// Función para mover el jugador
function movePlayer(event) {
  let newPosition = { ...playerPosition };

  switch (event.key) {
    case 'ArrowUp':
      if (playerPosition.row > 1) newPosition.row--;
      break;
    case 'ArrowDown':
      if (playerPosition.row < 5) newPosition.row++;
      break;
    case 'ArrowLeft':
      if (playerPosition.column > 1) newPosition.column--;
      break;
    case 'ArrowRight':
      if (playerPosition.column < 5) newPosition.column++;
      break;
  }

  if (!isWall(newPosition)) {
    playerPosition = newPosition;
    updatePlayerPosition();
    checkForWin();
  }
}

// Función para verificar si la nueva posición es una pared
function isWall(position) {
  return walls.some(wall => wall.row === position.row && wall.column === position.column);
}

// Función para actualizar la posición del jugador en el DOM
function updatePlayerPosition() {
  player.style.gridRow = playerPosition.row;
  player.style.gridColumn = playerPosition.column;
}

// Función para verificar si el jugador ha llegado a la meta
function checkForWin() {
  if (playerPosition.row === goalPosition.row && playerPosition.column === goalPosition.column) {
    messageDisplay.textContent = '¡Ganaste! Llegaste a la meta.';
    document.removeEventListener('keydown', movePlayer);
    resetButton.classList.remove('hidden');
  }
}

// Función para reiniciar el juego
function resetGame() {
  playerPosition = { row: 1, column: 1 };
  messageDisplay.textContent = '';
  updatePlayerPosition();
  resetButton.classList.add('hidden');
  document.addEventListener('keydown', movePlayer);
}

// Inicializa el juego
document.addEventListener('keydown', movePlayer);
resetButton.addEventListener('click', resetGame);
