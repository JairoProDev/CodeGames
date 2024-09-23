// Variables principales
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;
const maxAttempts = 10;

// Referencias a los elementos del DOM
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const messageDisplay = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetButton = document.getElementById('reset-button');
const progressBar = document.getElementById('progress-bar');

// Función para comprobar el número
function checkGuess() {
  const userGuess = parseInt(guessInput.value);
  
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    messageDisplay.textContent = "Por favor, introduce un número válido entre 1 y 100.";
    messageDisplay.className = "incorrect";
    return;
  }

  attemptsLeft--;
  updateProgressBar();

  if (userGuess === randomNumber) {
    messageDisplay.textContent = `¡Felicidades! Adivinaste el número ${randomNumber}.`;
    messageDisplay.className = "correct";
    endGame();
  } else if (userGuess < randomNumber) {
    messageDisplay.textContent = "El número es mayor. ¡Intenta de nuevo!";
    messageDisplay.className = "incorrect";
  } else {
    messageDisplay.textContent = "El número es menor. ¡Intenta de nuevo!";
    messageDisplay.className = "incorrect";
  }

  attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;

  if (attemptsLeft === 0) {
    messageDisplay.textContent = `¡Perdiste! El número era ${randomNumber}.`;
    endGame();
  }

  guessInput.value = '';
}

// Función para actualizar la barra de progreso
function updateProgressBar() {
  const progressPercentage = (attemptsLeft / maxAttempts) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Función para finalizar el juego
function endGame() {
  guessButton.disabled = true;
  resetButton.classList.remove('hidden');
}

// Función para reiniciar el juego
function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  guessButton.disabled = false;
  guessInput.value = '';
  messageDisplay.textContent = '';
  messageDisplay.className = '';
  attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
  resetButton.classList.add('hidden');
  progressBar.style.width = '100%';
}

// Eventos
guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
guessInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});
