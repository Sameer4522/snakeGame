const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const board = document.getElementById("board");

let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 6;
let snakeArr = [{ x: 28, y: 18 }];
let food = { x: 24, y: 6 };
let score = 0;
let currentScore = document.getElementById("currentScore");
let biggestScore = 0;

// Game functions

let main = (ctime) => {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPaintTime = ctime;
    gameEnigne();
  }
};

let snakeCollide = (fullSnake) => {
  // if you bump into your own body
  for (let i = 1; i < snakeArr.length; i++) {
    if (
      fullSnake[i].x === fullSnake[0].x &&
      fullSnake[i].y === fullSnake[0].y
    ) {
      return true;
    }
  }

  //if you bump in wall & if you bumb into wall
  if (
    fullSnake[0].x >= 31 ||
    fullSnake[0].x <= 0 ||
    fullSnake[0].y >= 21 ||
    fullSnake[0].y <= 0
  ) {
    return true;
  }
};

let gameEnigne = () => {
  // Part1 = Updating the snake array and food
  if (snakeCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 16, y: 12 }];
    // musicSound.play()
    score = 0;
    currentScore.innerHTML = "Current Score = 0";
  }

  // if snake eat food, score++, regenerate the food & speed++
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();

    score++;
    currentScore.innerHTML = "Current Score = " + score;

    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    let a = 1;
    let b = 20;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };

    speed = speed + 0.2;
  }
  currScoreValue = score;
  if (currScoreValue >= biggestScore) {
    biggestScore = currScoreValue;
  } else if (biggestScore > currScoreValue) {
    document.getElementById("highestScore").innerHTML =
      "Highest Score = " + biggestScore;
    window.localStorage.setItem("biggestScore", JSON.stringify(biggestScore));
  } else {
    document.getElementById("highestScore").innerHTML =
      "Highest Score = " + window.localStorage.getItem("biggestScore");
  }

  //move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part2 = Display the snake and food
  // For Displaying the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("snakeHead");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });

  // For Displaying the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("snakeFood");
  board.appendChild(foodElement);
};

// main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
    case "w":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
    case "s":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
    case "d":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
    case "a":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
