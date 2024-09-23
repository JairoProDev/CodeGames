let score = 0;
let timeLeft = 60;
let interval;
let currentEquation = {};

// Referencias a los elementos del DOM
const equationDisplay = document.getElementById('equation');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

// Función para generar una nueva ecuación
function generateEquation() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  let equationText;
  let correctAnswer;
  
  switch (operator) {
    case '+':
      equationText = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;
    case '-':
      equationText = `${num1} - ${num2}`;
      correctAnswer = num1 - num2;
      break;
    case '*':
      equationText = `${num1} * ${num2}`;
      correctAnswer = num1 * num2;
      break;
    case '/':
      equationText = `${num1 * num2} / ${num2}`;
      correctAnswer = num1;
      break;
  }
  
  currentEquation = {
    text: equationText,
    answer: correctAnswer
  };
  
  equationDisplay.textContent = `¿Cuánto es ${equationText}?`;
}

// Función para manejar la respuesta del jugador
function handleAnswer() {
  const playerAnswer = parseFloat(answerInput.value);
  
  if (playerAnswer === currentEquation.answer) {
    score++;
    scoreDisplay.textContent = score;
    messageDisplay.textContent = "¡Correcto!";
    messageDisplay.style.color = 'green';
  } else {
    messageDisplay.textContent = "¡Incorrecto!";
    messageDisplay.style.color = 'red';
  }
  
  answerInput.value = '';
  generateEquation();
}

// Función para iniciar el juego
function startGame() {
  score = 0;
  timeLeft = 60;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  messageDisplay.textContent = '';
  answerInput.value = '';
  answerInput.disabled = false;
  submitButton.disabled = false;
  resetButton.classList.add('hidden');
  
  generateEquation();
  startTimer();
}

// Función para manejar el temporizador
function startTimer() {
  interval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft === 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

// Función para finalizar el juego
function endGame() {
  answerInput.disabled = true;
  submitButton.disabled = true;
  messageDisplay.textContent = `¡Juego terminado! Tu puntuación final es: ${score}`;
  resetButton.classList.remove('hidden');
}

// Eventos
submitButton.addEventListener('click', handleAnswer);
resetButton.addEventListener('click', startGame);

// Iniciar juego al cargar la página
startGame();
