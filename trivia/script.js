// Preguntas de trivia
const questions = [
    {
      question: "¿Cuál es el planeta más cercano al Sol?",
      answers: ["Tierra", "Venus", "Marte", "Mercurio"],
      correct: "Mercurio"
    },
    {
      question: "¿Quién escribió 'Cien años de soledad'?",
      answers: ["Pablo Neruda", "Gabriel García Márquez", "Julio Cortázar", "Mario Vargas Llosa"],
      correct: "Gabriel García Márquez"
    },
    {
      question: "¿Cuál es el océano más grande del mundo?",
      answers: ["Atlántico", "Ártico", "Pacífico", "Índico"],
      correct: "Pacífico"
    },
    {
      question: "¿En qué año llegó el hombre a la luna?",
      answers: ["1969", "1959", "1975", "1965"],
      correct: "1969"
    },
    {
      question: "¿Cuál es el metal más pesado?",
      answers: ["Plomo", "Mercurio", "Oro", "Osmio"],
      correct: "Osmio"
    },
    {
        question: "¿Cuál es la capital de España?",
        answers: [
          { text: "Madrid", correct: true },
          { text: "Barcelona", correct: false },
          { text: "Sevilla", correct: false },
          { text: "Valencia", correct: false }
        ]
      },
      {
        question: "¿Cuántos continentes hay en el mundo?",
        answers: [
          { text: "5", correct: false },
          { text: "6", correct: false },
          { text: "7", correct: true },
          { text: "8", correct: false }
        ]
      },
      {
        question: "¿Cuál es el río más largo del mundo?",
        answers: [
          { text: "Nilo", correct: false },
          { text: "Amazonas", correct: true },
          { text: "Yangtsé", correct: false },
          { text: "Misisipi", correct: false }
        ]
      },
      {
        question: "¿Cuál es el planeta más cercano al sol?",
        answers: [
          { text: "Venus", correct: false },
          { text: "Marte", correct: false },
          { text: "Mercurio", correct: true },
          { text: "Júpiter", correct: false }
        ]
      },
      {
        question: "¿Cuántos días tiene un año bisiesto?",
        answers: [
          { text: "364", correct: false },
          { text: "365", correct: false },
          { text: "366", correct: true },
          { text: "367", correct: false }
        ]
      },
      {
        question: "¿Cuál es el océano más grande del mundo?",
        answers: [
          { text: "Atlántico", correct: false },
          { text: "Índico", correct: false },
          { text: "Ártico", correct: false },
          { text: "Pacífico", correct: true }
        ]
      },
      {
        question: "¿Cuál es el animal terrestre más rápido?",
        answers: [
          { text: "León", correct: false },
          { text: "Guepardo", correct: true },
          { text: "Tigre", correct: false },
          { text: "Elefante", correct: false }
        ]
      },
      {
        question: "¿Cuál es el país más grande del mundo?",
        answers: [
          { text: "China", correct: false },
          { text: "Canadá", correct: false },
          { text: "Estados Unidos", correct: false },
          { text: "Rusia", correct: true }
        ]
      },
      {
        question: "¿Cuál es el elemento químico con el símbolo O?",
        answers: [
          { text: "Oro", correct: false },
          { text: "Oxígeno", correct: true },
          { text: "Osmio", correct: false },
          { text: "Oganesón", correct: false }
        ]
      },
      {
        question: "¿Cuál es el número pi?",
        answers: [
          { text: "3.14", correct: true },
          { text: "2.71", correct: false },
          { text: "1.61", correct: false },
          { text: "1.41", correct: false }
        ]
      }
  ];
  
  // Variables principales
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Referencias a los elementos del DOM
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const nextButton = document.getElementById('next-button');
  const scoreElement = document.getElementById('score');
  
  // Función para mostrar la pregunta actual
  function showQuestion() {
    // Limpia las respuestas anteriores
    answersContainer.innerHTML = '';
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    // Muestra las respuestas como botones
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.addEventListener('click', () => selectAnswer(answer));
      answersContainer.appendChild(button);
    });
  }
  
  // Función para manejar la selección de una respuesta
  function selectAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    
    if (selectedAnswer === correctAnswer) {
      score++;
      scoreElement.textContent = `Puntuación: ${score}`;
      alert("¡Correcto!");
    } else {
      alert(`Incorrecto. La respuesta correcta era: ${correctAnswer}`);
    }
  
    // Muestra el botón de "Siguiente" para la próxima pregunta
    nextButton.classList.remove('hidden');
  }
  
  // Función para pasar a la siguiente pregunta
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      nextButton.classList.add('hidden');
    } else {
      alert(`¡Juego terminado! Tu puntuación final es: ${score}`);
      restartGame();
    }
  }
  
  // Función para reiniciar el juego
  function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Puntuación: ${score}`;
    showQuestion();
    nextButton.classList.add('hidden');
  }
  
  // Inicializa el juego
  showQuestion();
  
  // Eventos
  nextButton.addEventListener('click', nextQuestion);
  