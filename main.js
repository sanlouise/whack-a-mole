let endGameTimeout;
let mole;
let placeMoleInterval;
let randomTile;
let score = 0;
let tile;

const clearElementsFromUI = () => {
  const gameBoard = document.getElementById('gameboard');
  const score = document.getElementById('score');
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');

  // Hide button when game is in progress
  if (startButton) {
    document.getElementById('start').style.display = 'none';
  }

  if (resetButton) {
    resetButton.remove();
  }

  if (gameBoard) {
    gameBoard.remove();
  }

  if (score) {
    score.remove();
  }
};

const createElementsOnUI = () => {
  let hole;
  score = 0;

  // Create the gameBoard
  const gameBoard = document.createElement('div');
  gameBoard.id = 'gameboard';
  document.body.prepend(gameBoard);

  // Show the stop button once game runs
  document.getElementById('stop').style.display = 'flex';

  // Add a score div
  const scoreDiv = document.createElement('div');
  scoreDiv.id = 'score';
  scoreDiv.innerText = `Your score is ${score}`;

  // Add a reset button to the control div once first game is played
  const resetButton = document.createElement('button');
  const controls = document.getElementById('controls');
  const resetText = document.createTextNode('Reset Game');
  controls.append(scoreDiv);
  resetButton.appendChild(resetText);
  resetButton.id = 'reset';
  resetButton.addEventListener('click', resetGame);
  controls.prepend(resetButton);

  // Create the tiles
  for (let i = 1; i <= 9; i++) {
    tile = document.createElement('div');
    tile.className = 'tile';

    // Create hole within the tile where mole hides
    hole = document.createElement('div');
    hole.className = 'hole';
    tile.appendChild(hole);
    gameBoard.appendChild(tile);
  }
};

const incrementScore = () => {
  score++;
  updateDOMScore();
};

const placeMole = () => {
  // Remove previously created mole
  removeMole();

  // Find all tiles
  const tiles = document.querySelectorAll('.tile');

  // Create mole
  mole = document.createElement('div');
  mole.className = 'mole';

  // Find a random tile
  randomTile = tiles[Math.floor(Math.random() * 9)];

  // Add mole to random tile
  randomTile.appendChild(mole);
  mole.addEventListener('click', whackMole);
};

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

// Ensure to clear UI elements before starting a new game
const resetGame = () => {
  clearElementsFromUI();
  runGame();
};

// Remove mole that exists on UI
const removeMole = () => {
  if (mole) {
    mole.removeEventListener('click', whackMole);
    mole.remove();
  }
};

const runGame = () => {
  //Ensure any existing timeouts are cleared before restarting the game
  clearInterval(placeMoleInterval);
  clearTimeout(endGameTimeout);

  // Remove gameBoard and previous score from UI;
  clearElementsFromUI();
  createElementsOnUI();
  placeMoleInterval = setInterval(placeMole, randomTime(800, 2100));
  placeMole();

  // End the game. after 60s
  endGameTimeout = setTimeout(() => {
    clearInterval(placeMoleInterval);

    // Ensure any existing moles on UI are removed
    removeMole();

    // Remove stop button from DOM
    document.getElementById('stop').style.display = 'none';

    // Run the game 60 seconds
  }, 60000);
};

const stopGame = () => {
  clearInterval(placeMoleInterval);
  clearTimeout(endGameTimeout);

  const gameBoard = document.getElementById('gameboard');
  document.getElementById('stop').style.display = 'none';
  document.getElementById('reset').style.display = 'none';
  document.getElementById('start').style.display = 'flex';

  if (gameBoard) {
    gameBoard.remove();
  }
};

const updateDOMScore = () => {
  const scoreDiv = document.getElementById('score');
  scoreDiv.innerText = `Your score is ${score}`;
};

const whackMole = () => {
  incrementScore();
  removeMole();
};

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.addEventListener('click', runGame);
stopButton.addEventListener('click', stopGame);