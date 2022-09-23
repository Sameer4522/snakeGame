const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const board = document.getElementById("board");

let direction = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 2;
let snakeArr = [{ x: 16, y: 12 }];

// Gmae functions

let main = (ctime) => {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPaintTime = ctime;
    gameEnigne();
  }
};

let gameEnigne = () => {
  // Part1 = Updating the snake array and food
  // Part2 = Display the snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add("food");
    board.appendChild(snakeElement);
  });
};

// main logic
window.requestAnimationFrame(main);
