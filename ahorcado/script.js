const words = ['javascript', 'programacion', 'html', 'css', 'ahorcado'];
let selectedWord = '';
let attemptsLeft = 6;
let guessedLetters = [];
let wrongLetters = [];

// Referencias a los elementos del DOM
const wordDisplay = document.getElementById('word-display');
const letterInput = document.getElementById('letter-input');
const submitButton = document.getElementById('submit-button');
const messageDisplay = document.getElementById('message');
const wrongLettersDisplay = document.getElementById('wrong-letters');
const attemptsLeftDisplay = document.getElementById('attempts-left');
const resetButton = document.getElementById('reset-button');

// Función para seleccionar una palabra al azar
function selectRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[randomIndex];
}

// Función para mostrar la palabra oculta
function displayWord() {
  const display = selectedWord
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');
  wordDisplay.textContent = display;
}

// Función para manejar la entrada del jugador
function handleGuess() {
  const guessedLetter = letterInput.value.toLowerCase();

  if (guessedLetter && !guessedLetters.includes(guessedLetter)) {
    if (selectedWord.includes(guessedLetter)) {
      guessedLetters.push(guessedLetter);
      messageDisplay.textContent = '¡Bien hecho!';
      messageDisplay.style.color = 'green';
    } else {
      wrongLetters.push(guessedLetter);
      attemptsLeft--;
      wrongLettersDisplay.textContent = wrongLetters.join(', ');
      attemptsLeftDisplay.textContent = attemptsLeft;
      messageDisplay.textContent = 'Letra incorrecta.';
      messageDisplay.style.color = 'red';
    }
  } else {
    messageDisplay.textContent = 'Letra ya ingresada o inválida.';
    messageDisplay.style.color = 'red';
  }

  letterInput.value = '';
  letterInput.focus();
  checkGameStatus();
  displayWord();
}

// Función para revisar el estado del juego
function checkGameStatus() {
  if (!wordDisplay.textContent.includes('_')) {
    messageDisplay.textContent = '¡Felicidades! Ganaste.';
    submitButton.disabled = true;
    resetButton.classList.remove('hidden');
  }

  if (attemptsLeft === 0) {
    messageDisplay.textContent = `¡Perdiste! La palabra era "${selectedWord}".`;
    submitButton.disabled = true;
    resetButton.classList.remove('hidden');
  }
}

// Función para reiniciar el juego
function resetGame() {
  guessedLetters = [];
  wrongLetters = [];
  attemptsLeft = 6;
  attemptsLeftDisplay.textContent = attemptsLeft;
  wrongLettersDisplay.textContent = '';
  messageDisplay.textContent = '';
  submitButton.disabled = false;
  resetButton.classList.add('hidden');
  letterInput.value = '';
  letterInput.focus();
  selectRandomWord();
  displayWord();
}

// Inicializa el juego
selectRandomWord();
displayWord();

// Eventos
submitButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', resetGame);
letterInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleGuess();
  }
});
