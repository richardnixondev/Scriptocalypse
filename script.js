const gameIntro = document.getElementById('game-intro');
const gameArea = document.getElementById("gameArea");
const gameEnd = document.getElementById('game-end');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const timerElement = document.getElementById('timer');
const finalScoreElement = document.getElementById('final-score');
const finalTimeElement = document.getElementById('final-time');
const gameAreaHeight = window.innerHeight * 0.8;
const gameAreaWidth = window.innerWidth * 0.8;
const stats = document.getElementById('stats');
const volumeSlider = document.getElementById('volume');

let player = document.createElement("img");
let enemyInterval;
//let bulletInterval;
let sec = 0;
let min = 0;
let intervalTimer;
let lives = 3;
let score = 0;
let playerY = gameAreaHeight / 2 - 25;
let gameVolume = 0.4;


// Set background image

// Setup Game Intro state
function introPage() {
    gameIntro.style.display = 'block';
    gameArea.style.display = 'none';
    gameEnd.style.display = 'none';
    stats.style.display = 'none';
}

// Run the game when start button is pressed
function startGame() {
    startButton.addEventListener('click', () => {
        gameArea.style.width = gameAreaWidth + "px";
        gameArea.style.height = gameAreaHeight + "px";
        gameArea.style.position = "relative";
        gameArea.style.overflow = "hidden";
        gameIntro.style.display = 'none';
        gameArea.style.display = 'block';
        gameEnd.style.display = 'none';
        stats.style.display = 'block';
        sec = 0;
        min = 0;
        lives = 3;
        score = 0;
        scoreElement.innerText = score;
        livesElement.innerText = lives;
        clearInterval(intervalTimer);
        intervalTimer = setInterval(timeGame, 1000);
        spawnPlayer();
        spawnEnemy();
    });

}

// Game Time
function timeGame() {
    sec++;
    sec = sec < 10 ? "0" + sec : sec;
    if (sec == 60) {
        min++;
        sec = 0;
    }
    timerElement.innerText = 'Time elapsed: ' + min + ':' + sec;
}

function spawnPlayer() {
    player.src = "images/shooter.gif";
    player.classList.add("player");
    gameArea.appendChild(player);
    playerMove();   
    // Player movement and shooting
    player.style.bottom = playerY + "px";
        let bulletInterval = setInterval(() => {
        let checkPlayerColision = document.querySelectorAll(".enemy");
        checkPlayerColision.forEach(enemy => {
                checkCollisionEnemy(player, enemy);
        });
    },20);   
}

function playerMove(){
    document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && playerY < gameAreaHeight - 60) {
        playerY += 40;
    } else if (e.key === "ArrowDown" && playerY > 0) {
        playerY -= 40;
    } else if (e.key === " ") {
        shoot();
    }
    player.style.bottom = playerY + "px";
});
}


volumeSlider.addEventListener('input', (event) => {
    gameVolume = event.target.value;
});

function playSound(src) {
    const sound = new Audio(src);
    sound.volume = gameVolume;
    sound.play();
}

function shoot() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    gameArea.appendChild(bullet);
    bullet.style.left = "60px";
    bullet.style.bottom = playerY + 20 + "px";
    
    let bulletInterval = setInterval(() => {
        let bulletX = bullet.offsetLeft;

        let checkShoot = document.querySelectorAll(".enemy");
        checkShoot.forEach(enemy => {
            checkCollision(bullet, enemy);
        });

        if (bulletX > gameAreaWidth) {
            bullet.remove();
            clearInterval(bulletInterval);
        } else {
            bullet.style.left = bulletX + 10 + "px";
        }
    }, 20);

    playSound("sounds/shoot.mp3");
}

function spawnEnemy() {
    const enemy = document.createElement("img");
    enemy.src = "images/zombie.gif";
    enemy.classList.add("enemy");
    gameArea.appendChild(enemy);
    enemy.style.right = "0px";
    enemy.style.bottom = Math.random() * (gameAreaHeight - 50) + "px";

    enemyInterval = setInterval(() => {
        let enemyX = enemy.offsetLeft;
        if (enemyX < 0) {
            enemy.remove();
            clearInterval(enemyInterval);
        } else {
            enemy.style.right = parseInt(enemy.style.right) + 5 + "px";
        }
    }, 50);

    setTimeout(spawnEnemy, Math.random() * 2000 + 100);
}

function checkCollision(bullet, enemy) {
    if (bullet.offsetLeft < enemy.offsetLeft + enemy.offsetWidth &&
        bullet.offsetLeft + bullet.offsetWidth > enemy.offsetLeft &&
        bullet.offsetTop < enemy.offsetTop + enemy.offsetHeight &&
        bullet.offsetTop + bullet.offsetHeight > enemy.offsetTop) {

        bullet.remove();
        enemy.remove();
        score++;
        scoreElement.innerText = score;
    }
}

function checkPlayerCollisions(){
    let checkPlayerColision = document.querySelectorAll(".enemy");
    checkPlayerColision.forEach(enemy => {
        checkCollisionEnemy(player, enemy);
    });
}


function checkCollisionEnemy(player, enemy) {
    if (player.offsetLeft < enemy.offsetLeft + enemy.offsetWidth &&
        player.offsetLeft + player.offsetWidth > enemy.offsetLeft &&
        player.offsetTop < enemy.offsetTop + enemy.offsetHeight &&
        player.offsetTop + player.offsetHeight > enemy.offsetTop) {

        enemy.remove();
        lives--;
        livesElement.innerText = lives;

        if (lives === 0) {
            endGame();
        } else {
            playSound("sounds/lostlife.mp3");
        }
    }
}

// Setup End game state
function endGame() {
    clearInterval(intervalTimer);
    gameArea.style.display = 'none';
    gameEnd.style.display = 'block';
    stats.style.display = 'block';

    // stats on Game Over screen
    finalScoreElement.innerText = score;
    finalTimeElement.innerText = 'Time elapsed: ' + min + ':' + sec;

    playSound("sounds/gameover.mp3");

    // Remove enemys and bullets
    document.querySelectorAll(".enemy").forEach(enemy => enemy.remove());
    document.querySelectorAll(".bullet").forEach(bullet => bullet.remove());
}

// Restart game when the button restart is pressed
restartButton.addEventListener('click', () => {
    gameEnd.style.display = 'none';
    gameArea.style.display = 'block';
    stats.style.display = 'block';
    sec = 0;
    min = 0;
    lives = 3;
    score = 0;
    scoreElement.innerText = score;
    livesElement.innerText = lives;
    clearInterval(intervalTimer); // clear time interval
    clearInterval(enemyInterval); // clear enemy interval
    document.querySelectorAll(".enemy").forEach(enemy => enemy.remove()); //make sure have no enemys and also fix the bug of have a ghost enemy after restart
    intervalTimer = setInterval(timeGame, 1000);
    //spawnEnemy();
});

// Start the initial function introPage() and startGame();
introPage();
startGame();
