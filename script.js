const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restart");

let isJumping = false;
let score = 0;
let scoreInterval;
let cactusInterval;

// 🦖 Jump Logic
document.addEventListener("keydown", jump);

function jump() {
  if (isJumping) return;
  isJumping = true;
  let up = 0;

  let jumpInterval = setInterval(() => {
    if (up >= 100) {
      clearInterval(jumpInterval);
      // Down
      let downInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        up -= 10;
        dino.style.bottom = up + "px";
      }, 20);
    }
    up += 10;
    dino.style.bottom = up + "px";
  }, 20);
}

// 🌵 Move cactus + check collision
function startCactus() {
  cactus.style.right = "-60px";

  cactusInterval = setInterval(() => {
    let cactusRight = parseInt(window.getComputedStyle(cactus).right);
    cactus.style.right = cactusRight + 10 + "px";

    let dinoBottom = parseInt(window.getComputedStyle(dino).bottom);

    // collision detection
    if (cactusRight > 500 && cactusRight < 550 && dinoBottom < 40) {
      gameOver();
    }

    if (cactusRight > 700) {
      cactus.style.right = "-60px";
    }
  }, 30);
}

// 🏆 Score Counter
function startScore() {
  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = score;
  }, 100);
}

// ❌ Game Over Handling
function gameOver() {
  clearInterval(scoreInterval);
  clearInterval(cactusInterval);
  finalScore.textContent = score;
  gameOverScreen.style.display = "block";
}

// 🔁 Restart Game
restartBtn.addEventListener("click", () => {
  location.reload();
});

// ▶️ Start Game Automatically
startScore();
startCactus();
