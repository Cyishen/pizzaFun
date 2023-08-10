const scoreElement = document.querySelector('.score');
const timeLeftElement = document.querySelector('.time');
const pizzaElement = document.getElementById('pizza');
const startButton = document.querySelector('.timer__button');

const pizzaImages = [
  'image/pizza01.png',
  'image/pizza02.png',
  'image/pizza03.png',
  'image/pizza04.png',
];

let gameInterval;
let timeLeft = 0;
let score = 0;
let gameRunning = false;
let currentPizzaIndex = 0;
let slicesEaten = 0;

const eatSound = new Audio('image/chewing.wav');

function eatPizza() {
  if (gameRunning && slicesEaten < 8) {
    slicesEaten++;
    pizzaElement.classList.add(`bite-${slicesEaten}`);

    if (slicesEaten >= 8) {
        slicesEaten = 0;
        currentPizzaIndex = (currentPizzaIndex + 1) % pizzaImages.length;
        setTimeout(() => {
            pizzaElement.src = pizzaImages[currentPizzaIndex];
            resetPizza();
        }, 100);
    }
    eatSound.play();
        score++;
        scoreElement.textContent = score;
  }
}



function updateTime() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimeDisplay();
  } else {
    stopGame();
  }
}

function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timeLeftElement.textContent = displayTime;
}

function gameStart() {
  if (!gameRunning) {
    timeLeft = parseInt(startButton.getAttribute('data-time'));
    updateTimeDisplay();
    startButton.disabled = true;
    gameRunning = true;

    currentPizzaIndex = 0;
    pizzaElement.src = pizzaImages[currentPizzaIndex];
    slicesEaten = 0;

    resetPizza();
    score = 0;
    scoreElement.textContent = score;

    gameInterval = setInterval(updateTime, 1000);
  }
}


function stopGame() {
  clearInterval(gameInterval);
  startButton.disabled = false;
  gameRunning = false;
}

function resetPizza() {
  pizzaElement.classList.remove('bite-1', 'bite-2', 'bite-3', 'bite-4', 'bite-5', 'bite-6', 'bite-7', 'bite-8');
}

pizzaElement.addEventListener('click', eatPizza);






