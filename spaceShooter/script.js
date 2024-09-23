const spaceship = document.getElementById('spaceship');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

let score = 0;
let isGameOver = false;
let asteroids = [];
let lasers = [];
let gameInterval;
let asteroidInterval;

// Función para mover la nave
function moveSpaceship(event) {
  const step = 20;
  const maxLeft = gameArea.clientWidth - spaceship.clientWidth;
  let currentLeft = spaceship.offsetLeft;

  if (event.key === 'ArrowLeft' && currentLeft > 0) {
    spaceship.style.left = currentLeft - step + 'px';
  } else if (event.key === 'ArrowRight' && currentLeft < maxLeft) {
    spaceship.style.left = currentLeft + step + 'px';
  }

  // Disparar con la barra espaciadora
  if (event.key === ' ') {
    shootLaser();
  }
}

// Función para disparar un láser
function shootLaser() {
  const laser = document.createElement('div');
  laser.classList.add('laser');
  laser.style.left = spaceship.offsetLeft + spaceship.clientWidth / 2 - 2.5 + 'px';
  laser.style.top = spaceship.offsetTop + 'px';
  gameArea.appendChild(laser);
  lasers.push(laser);
}

// Función para crear un asteroide
function createAsteroid() {
  const asteroid = document.createElement('div');
  asteroid.classList.add('asteroid');
  asteroid.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';
  gameArea.appendChild(asteroid);
  asteroids.push(asteroid);
}

// Función para mover asteroides y láseres
function gameLoop() {
  lasers.forEach((laser, laserIndex) => {
    let laserTop = laser.offsetTop;
    if (laserTop <= 0) {
      laser.remove();
      lasers.splice(laserIndex, 1);
    } else {
      laser.style.top = laserTop - 10 + 'px';
    }

    // Comprobar colisiones con asteroides
    asteroids.forEach((asteroid, asteroidIndex) => {
      if (isCollision(laser, asteroid)) {
        asteroid.remove();
        laser.remove();
        asteroids.splice(asteroidIndex, 1);
        lasers.splice(laserIndex, 1);
        score++;
        scoreDisplay.textContent = score;
      }
    });
  });

  asteroids.forEach((asteroid, asteroidIndex) => {
    let asteroidTop = asteroid.offsetTop;
    if (asteroidTop >= gameArea.clientHeight) {
      endGame();
    } else {
      asteroid.style.top = asteroidTop + 5 + 'px';
    }
  });
}

// Función para verificar colisiones
function isCollision(laser, asteroid) {
  const laserRect = laser.getBoundingClientRect();
  const asteroidRect = asteroid.getBoundingClientRect();

  return !(
    laserRect.bottom < asteroidRect.top ||
    laserRect.top > asteroidRect.bottom ||
    laserRect.right < asteroidRect.left ||
    laserRect.left > asteroidRect.right
  );
}

// Función para terminar el juego
function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  clearInterval(asteroidInterval);
  resetButton.classList.remove('hidden');
}

// Función para reiniciar el juego
function resetGame() {
  score = 0;
  isGameOver = false;
  scoreDisplay.textContent = score;
  resetButton.classList.add('hidden');
  gameArea.innerHTML = '<div id="spaceship"></div>';
  asteroids = [];
  lasers = [];
  spaceship.style.left = '50%';
  startGame();
}

// Función para iniciar el juego
function startGame() {
  gameInterval = setInterval(gameLoop, 50);
  asteroidInterval = setInterval(createAsteroid, 1000);
}

// Eventos
document.addEventListener('keydown', moveSpaceship);
resetButton.addEventListener('click', resetGame);

// Iniciar el juego
startGame();
