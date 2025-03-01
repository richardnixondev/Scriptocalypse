
const gameIntro = document.getElementById('game-intro');
const gameArea = document.getElementById("gameArea");
const player = document.getElementById('player');
const gameEnd = document.getElementById('game-end');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const stats = document.getElementById('stats');

// Setup  Game Intro state
function introPage() {
    gameIntro.style.display = 'block';
    gameArea.style.display = 'none';
    gameEnd.style.display = 'none';
    stats.style.display = 'none';
  }
  
  // run the game when start button is pressed
function startGame() { 
  startButton.addEventListener('click', () => {
    gameIntro.style.display = 'none';
    gameArea.style.display = 'block';
    gameEnd.style.display = 'none';   
    stats.style.display = 'block';
  
    // here will run the game
    let playerY = window.innerHeight / 2 - 25;
        player.style.bottom = playerY + "px";

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" && playerY < window.innerHeight - 60) {
                playerY += 40;
            } else if (e.key === "ArrowDown" && playerY > 0) {
                playerY -= 40;
            } else if (e.key === " ") {
                shoot();
            }
            player.style.bottom = playerY + "px";
        });

        function shoot() {
            const bullet = document.createElement("div");
            bullet.classList.add("bullet");
            gameArea.appendChild(bullet);
            bullet.style.left = "60px";
            bullet.style.bottom = playerY + 20 + "px";
            
            let bulletInterval = setInterval(() => {
                let bulletX = bullet.offsetLeft;
                if (bulletX > window.innerWidth) {
                    bullet.remove();
                    clearInterval(bulletInterval);
                } else {
                    bullet.style.left = bulletX + 10 + "px";
                }
            }, 20);
        }

        function spawnEnemy() {
            const enemy = document.createElement("div");
            enemy.classList.add("enemy");
            gameArea.appendChild(enemy);
            enemy.style.right = "0px";
            enemy.style.bottom = Math.random() * (window.innerHeight - 50) + "px";
            
            let enemyInterval = setInterval(() => {
                let enemyX = enemy.offsetLeft;
                if (enemyX < 0) {
                    enemy.remove();
                    clearInterval(enemyInterval);
                } else {
                    enemy.style.right = parseInt(enemy.style.right) + 5 + "px";
                }
            }, 50);
            
            setTimeout(spawnEnemy, Math.random() * 2000 + 1000);
        }
        
        spawnEnemy();
      });
}
  // Setup End game state
  function endGame() {
    gameArea.style.display = 'none';
    gameEnd.style.display = 'block';
  }
  
  // restart game when the button restart is pressed
  restartButton.addEventListener('click', () => {
    gameEnd.style.display = 'none';
    gameArea.style.display = 'block';
  
    // here will be the game restarted
    startGame();
  });
  


  
  
  //Start the inicial function introPage() and startGame();
  introPage();
  startGame();