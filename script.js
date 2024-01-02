'use strict';

let secretNumber, score, highScore;
const scoreElement = document.querySelector('.score');
const messageElement = document.querySelector('.message');

const initializeGame = () => {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  highScore = localStorage.getItem('highScore')
    ? parseInt(localStorage.getItem('highScore'))
    : 0;
  document.querySelector('.highscore').textContent = highScore;
  scoreElement.textContent = score;
  messageElement.textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.check').disabled = false;
  document.querySelector('body').style.backgroundColor = '#222';
};

const updateHighScore = () => {
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
    localStorage.setItem('highScore', highScore.toString());
  }
};

const checkGuess = () => {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    messageElement.textContent = '⛔️ No Number';
  } else if (guess === secretNumber) {
    messageElement.textContent = '🎉 Correct Number';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('body').style.backgroundColor = '#60b347';
    updateHighScore();
  } else {
    handleIncorrectGuess(guess);
  }
};

const handleIncorrectGuess = (guess) => {
  if (score > 1) {
    messageElement.textContent =
      guess > secretNumber ? '⬆️ Too high' : '⬇️ Too low';
    score--;
    scoreElement.textContent = score;
  } else {
    scoreElement.textContent = 0;
    messageElement.textContent = '💥 You lost the game 💥';
    document.querySelector('.check').disabled = true;
  }
};

const handleAgain = () => {
  const modal = document.getElementById('resetModal');
  const yesButton = document.getElementById('yesButton');
  const noButton = document.getElementById('noButton');

  modal.style.display = 'block';

  yesButton.addEventListener('click', () => {
    modal.style.display = 'none';
    initializeGame();
  });

  noButton.addEventListener('click', () => {
    highScore = 0;
    document.querySelector('.highscore').textContent = highScore;
    localStorage.setItem('highScore', highScore.toString());
    modal.style.display = 'none';
    initializeGame();
  });
};

document.querySelector('.check').addEventListener('click', checkGuess);
document.querySelector('.again').addEventListener('click', handleAgain);

initializeGame();
