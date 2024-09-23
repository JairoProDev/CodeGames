const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍋', '🍑'];
let cards = [...symbols, ...symbols]; // Doblar el array para las parejas
let score = 0;
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let lockBoard = false;

// Referencias a los elementos del DOM
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Función para barajar las cartas
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Función para crear el tablero de juego
function createBoard() {
  shuffle(cards);
  gameBoard.innerHTML = '';
  cards.forEach((symbol, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'hidden');
    cardElement.dataset.symbol = symbol;
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Función para voltear una carta
function flipCard() {
  if (lockBoard) return;  // Evitar interacción mientras se revisan cartas
  if (this === firstCard) return;  // Evitar que se haga clic en la misma carta

  this.classList.remove('hidden');
  this.textContent = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;  // Bloquear tablero mientras se revisa la jugada
    checkForMatch();
  }
}

// Función para verificar si las cartas coinciden
function checkForMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    matchedPairs++;
    score++;
    scoreDisplay.textContent = score;

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();

    if (matchedPairs === symbols.length) {
      messageDisplay.textContent = '¡Ganaste! Todas las parejas encontradas.';
      resetButton.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      firstCard.classList.add('hidden');
      secondCard.classList.add('hidden');
      resetBoard();
    }, 1000);
  }
}

// Función para reiniciar las variables de control
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Función para reiniciar el juego
function resetGame() {
  score = 0;
  matchedPairs = 0;
  scoreDisplay.textContent = score;
  messageDisplay.textContent = '';
  resetButton.classList.add('hidden');
  createBoard();
}

// Inicializa el juego
createBoard();

// Eventos
resetButton.addEventListener('click', resetGame);
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && resetButton.classList.contains('hidden')) {
    resetGame();
  }
});
