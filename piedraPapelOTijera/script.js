// Variables principales
let userScore = 0;
let computerScore = 0;

// Referencias a los elementos del DOM
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

// Función para la jugada de la computadora
function getComputerChoice() {
  const choices = ['Piedra', 'Papel', 'Tijeras'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Función para determinar el ganador
function playRound(userChoice) {
  const computerChoice = getComputerChoice();
  
  if (userChoice === computerChoice) {
    messageDisplay.textContent = `¡Empate! Ambos eligieron ${userChoice}.`;
  } else if (
    (userChoice === 'Piedra' && computerChoice === 'Tijeras') ||
    (userChoice === 'Papel' && computerChoice === 'Piedra') ||
    (userChoice === 'Tijeras' && computerChoice === 'Papel')
  ) {
    userScore++;
    messageDisplay.textContent = `¡Ganaste! ${userChoice} vence a ${computerChoice}.`;
  } else {
    computerScore++;
    messageDisplay.textContent = `¡Perdiste! ${computerChoice} vence a ${userChoice}.`;
  }
  
  updateScore();
  
  // Si alguno llega a 5 puntos, termina el juego
  if (userScore === 5 || computerScore === 5) {
    endGame();
  }
}

// Función para actualizar el marcador
function updateScore() {
  scoreDisplay.textContent = `Puntuación: Tú ${userScore} - ${computerScore} Computadora`;
}

// Función para finalizar el juego
function endGame() {
  rockButton.disabled = true;
  paperButton.disabled = true;
  scissorsButton.disabled = true;
  
  const winner = userScore === 5 ? '¡Felicidades! Ganaste el juego.' : 'La computadora ganó el juego.';
  messageDisplay.textContent = winner;
  resetButton.classList.remove('hidden');
}

// Función para reiniciar el juego
function resetGame() {
  userScore = 0;
  computerScore = 0;
  messageDisplay.textContent = '';
  updateScore();
  
  rockButton.disabled = false;
  paperButton.disabled = false;
  scissorsButton.disabled = false;
  
  resetButton.classList.add('hidden');
}

// Eventos de botones
rockButton.addEventListener('click', () => playRound('Piedra'));
paperButton.addEventListener('click', () => playRound('Papel'));
scissorsButton.addEventListener('click', () => playRound('Tijeras'));
resetButton.addEventListener('click', resetGame);
