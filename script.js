
const gameIntro = document.getElementById('game-intro');
const gameScreen = document.getElementById('game-screen');
const player = document.getElementById('player');
const crosshair = document.getElementById('crosshair');
const gameEnd = document.getElementById('game-end');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const stats = document.getElementById('stats');

// Setup  Game Intro state
function initializePage() {
    gameIntro.style.display = 'block';
    gameScreen.style.display = 'none';
    gameEnd.style.display = 'none';
    stats.style.display = 'none';
  }
  
  // run the game when start button is pressed
  startButton.addEventListener('click', () => {
    gameIntro.style.display = 'none';
    gameScreen.style.display = 'block';
    gameEnd.style.display = 'none';   
    stats.style.display = 'block';
  
    // here will run the game
    startGame();
  });
  
  // Setup End game state
  function endGame() {
    gameScreen.style.display = 'none';
    gameEnd.style.display = 'block';
  }
  
  // restart game when the button restart is pressed
  restartButton.addEventListener('click', () => {
    gameEnd.style.display = 'none';
    gameScreen.style.display = 'block';
  
    // here will be the game restarted
    restartGame();
  });
  

  
  function startGame() {
    console.log('Game Running!');
  }
  
  function restartGame() {
    console.log('Game Restarted!');
  }
  
  //Start the inicial function initializePage();
  initializePage();