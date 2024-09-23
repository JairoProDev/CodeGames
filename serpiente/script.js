const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let snake = [{ row: 10, column: 10 }];
let direction = { row: 0, column: 1 };
let food = {};
let score = 0;
let isGameOver = false;
let speed = 200;

// Función para crear el tablero
function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < 20 * 20; i++) {
    const cell = document.createElement('div');
    gameBoard.appendChild(cell);
  }
}

// Función para dibujar la serpiente
function drawSnake() {
  snake.forEach(part => {
    const index = (part.row - 1) * 20 + (part.column - 1);
    gameBoard.children[index].classList.add('snake');
  });
}

// Función para generar comida
function generateFood() {
  let validPosition = false;

  while (!validPosition) {
    food = {
      row: Math.floor(Math.random() * 20) + 1,
      column: Math.floor(Math.random() * 20) + 1
    };

    validPosition = !snake.some(part => part.row === food.row && part.column === food.column);
  }

  const index = (food.row - 1) * 20 + (food.column - 1);
  gameBoard.children[index].classList.add('food');
}

// Función para mover la serpiente
function moveSnake() {
  const newHead = {
    row: snake[0].row + direction.row,
    column: snake[0].column + direction.column
  };

  if (checkCollision(newHead)) {
    endGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.row === food.row && newHead.column === food.column) {
    score++;
    speed = Math.max(50, speed - 10);
    scoreDisplay.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }

  updateBoard();
}

// Función para actualizar el tablero
function updateBoard() {
  document.querySelectorAll('.snake').forEach(cell => cell.classList.remove('snake'));
  document.querySelectorAll('.food').forEach(cell => cell.classList.remove('food'));

  drawSnake();
  const foodIndex = (food.row - 1) * 20 + (food.column - 1);
  gameBoard.children[foodIndex].classList.add('food');
}

// Función para verificar colisiones
function checkCollision(position) {
  if (position.row < 1 || position.row > 20 || position.column < 1 || position.column > 20) {
    return true;
  }

  return snake.some(part => part.row === position.row && part.column === position.column);
}

// Función para manejar el fin del juego
function endGame() {
  isGameOver = true;
  messageDisplay.textContent = '¡Juego terminado!';
  resetButton.classList.remove('hidden');
  clearInterval(gameInterval);
}

// Función para reiniciar el juego
function resetGame() {
  snake = [{ row: 10, column: 10 }];
  direction = { row: 0, column: 1 };
  score = 0;
  isGameOver = false;
  speed = 200;
  scoreDisplay.textContent = score;
  messageDisplay.textContent = '';
  resetButton.classList.add('hidden');
  createBoard();
  generateFood();
  drawSnake();
  gameInterval = setInterval(moveSnake, speed);
}

// Función para manejar los controles
function changeDirection(event) {
  if (isGameOver) return;

  switch (event.key) {
    case 'ArrowUp':
      if (direction.row === 0) direction = { row: -1, column: 0 };
      break;
    case 'ArrowDown':
      if (direction.row === 0) direction = { row: 1, column: 0 };
      break;
    case 'ArrowLeft':
      if (direction.column === 0) direction = { row: 0, column: -1 };
      break;
    case 'ArrowRight':
      if (direction.column === 0) direction = { row: 0, column: 1 };
      break;
  }
}

// Inicializa el juego
createBoard();
generateFood();
drawSnake();
let gameInterval = setInterval(moveSnake, speed);

// Eventos
document.addEventListener('keydown', changeDirection);
resetButton.addEventListener('click', resetGame);
