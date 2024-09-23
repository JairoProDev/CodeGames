// Variables principales
let sequence = [];
let playerSequence = [];
let level = 0;

// Referencias a los elementos del DOM
const greenBox = document.getElementById('green');
const redBox = document.getElementById('red');
const yellowBox = document.getElementById('yellow');
const blueBox = document.getElementById('blue');
const startButton = document.getElementById('start-button');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

// Función para generar un color aleatorio
function getRandomColor() {
  const colors = ['green', 'red', 'yellow', 'blue'];
  return colors[Math.floor(Math.random() * 4)];
}

// Función para parpadear el color
function flashColor(color) {
  const colorBox = document.getElementById(color);
  colorBox.style.opacity = '1';
  setTimeout(() => {
    colorBox.style.opacity = '0.8';
  }, 500);
}

// Función para mostrar la secuencia del juego
function showSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, 1000);
}

// Función para manejar el clic del jugador
function handlePlayerClick(color) {
  playerSequence.push(color);
  flashColor(color);
  checkPlayerMove(playerSequence.length - 1);
}

// Función para verificar la jugada del jugador
function checkPlayerMove(index) {
  if (playerSequence[index] !== sequence[index]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    level++;
    scoreDisplay.textContent = `Puntuación: ${level}`;
    nextRound();
  }
}

// Función para iniciar el próximo turno
function nextRound() {
  playerSequence = [];
  const nextColor = getRandomColor();
  sequence.push(nextColor);
  setTimeout(() => {
    showSequence();
  }, 1000);
}

// Función para iniciar el juego
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  scoreDisplay.textContent = `Puntuación: ${level}`;
  messageDisplay.textContent = 'Sigue la secuencia del juego';
  nextRound();
}

// Función para manejar el fin del juego
function gameOver() {
  messageDisplay.textContent = '¡Perdiste! Presiona "Iniciar Juego" para volver a jugar.';
  startButton.disabled = false;
}

// Eventos de botones
greenBox.addEventListener('click', () => handlePlayerClick('green'));
redBox.addEventListener('click', () => handlePlayerClick('red'));
yellowBox.addEventListener('click', () => handlePlayerClick('yellow'));
blueBox.addEventListener('click', () => handlePlayerClick('blue'));
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  startGame();
});
