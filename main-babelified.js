"use strict";

var endGameTimeout = void 0;
var mole = void 0;
var placeMoleInterval = void 0;
var randomTile = void 0;
var score = 0;
var tile = void 0;

var clearElementsFromUI = function clearElementsFromUI() {
  var gameBoard = document.getElementById("gameboard");
  var score = document.getElementById("score");
  var startButton = document.getElementById("start");
  var resetButton = document.getElementById("reset");

  // Hide button when game is in progress
  if (startButton) {
    document.getElementById("start").style.display = "none";
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

var createElementsOnUI = function createElementsOnUI() {
  var hole = void 0;
  score = 0;

  // Create the gameBoard
  var gameBoard = document.createElement("div");
  gameBoard.id = "gameboard";
  document.body.appendChild(gameBoard);

  // Show the stop button once game runs
  document.getElementById("stop").style.display = "flex";

  // Add a score div
  var scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  scoreDiv.innerText = "Your score is " + score;

  // Add a reset button to the control div once first game is played
  var resetButton = document.createElement("button");
  var controls = document.getElementById("controls");
  var resetText = document.createTextNode("Reset Game");
  controls.appendChild(scoreDiv);
  resetButton.appendChild(resetText);
  resetButton.id = "reset";
  resetButton.addEventListener("click", resetGame);
  controls.appendChild(resetButton);

  // Create the tiles
  for (var i = 1; i <= 9; i++) {
    tile = document.createElement("div");
    tile.className = "tile";

    // Create hole within the tile where mole hides
    hole = document.createElement("div");
    hole.className = "hole";
    tile.appendChild(hole);
    gameBoard.appendChild(tile);
  }
};

var incrementScore = function incrementScore() {
  score++;
  updateDOMScore();
};

var placeMole = function placeMole() {
  // Remove previously created mole
  removeMole();

  // Find all tiles
  var tiles = document.querySelectorAll(".tile");

  // Create mole
  mole = document.createElement("div");
  mole.className = "mole";

  // Find a random tile
  randomTile = tiles[Math.floor(Math.random() * 9)];

  // Add mole to random tile
  randomTile.appendChild(mole);
  mole.addEventListener("click", whackMole);
};

var randomTime = function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Ensure to clear UI elements before starting a new game
var resetGame = function resetGame() {
  clearElementsFromUI();
  runGame();
};

// Remove mole that exists on UI
var removeMole = function removeMole() {
  if (mole) {
    mole.removeEventListener("click", whackMole);
    mole.remove();
  }
};

var runGame = function runGame() {
  //Ensure any existing timeouts are cleared before restarting the game
  clearInterval(placeMoleInterval);
  clearTimeout(endGameTimeout);

  // Remove gameBoard and previous score from UI;
  clearElementsFromUI();
  createElementsOnUI();
  placeMoleInterval = setInterval(placeMole, randomTime(800, 2100));
  placeMole();

  // End the game. after 60s
  endGameTimeout = setTimeout(function() {
    clearInterval(placeMoleInterval);

    // Ensure any existing moles on UI are removed
    removeMole();

    // Remove stop button from DOM
    document.getElementById("stop").style.display = "none";

    // Run the game 60 seconds
  }, 60000);
};

var stopGame = function stopGame() {
  clearInterval(placeMoleInterval);
  clearTimeout(endGameTimeout);

  var gameBoard = document.getElementById("gameboard");
  document.getElementById("stop").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("start").style.display = "flex";

  if (gameBoard) {
    gameBoard.remove();
  }
};

var updateDOMScore = function updateDOMScore() {
  var scoreDiv = document.getElementById("score");
  scoreDiv.innerText = "Your score is " + score;
};

var whackMole = function whackMole() {
  incrementScore();
  removeMole();
};

var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");

startButton.addEventListener("click", runGame);
stopButton.addEventListener("click", stopGame);
