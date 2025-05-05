let player, wendigo;
let arrows = [];
let food = [];
let trees = [];
let rocks = [];
let stamina = 100;
let wendigoSpeed;
let arrowEffect = 0;
let gameOver = false;
let mountainY = 0;
let finishLineY;
let restartButton;
let obstacleSlowdown = 0;

// Image assets
let playerImg, wendigoImg, arrowImg, foodImg, treeImg, rockImg;

function preload() {
  playerImg = loadImage("assets/player.png");
  wendigoImg = loadImage("assets/wendigo.png");
  arrowImg = loadImage("assets/arrow.png");
  foodImg = loadImage("assets/food.png");
  treeImg = loadImage("assets/tree.png");
  rockImg = loadImage("assets/rock.png");
}

function setup() {
  createCanvas(600, 800);

  player = createVector(width / 2, height / 2);
  wendigo = createVector(random(width), player.y - 800);
  wendigoSpeed = 1;

  finishLineY = height + 1500;

  gameOver = false;
  stamina = 100;

  restartButton = createButton("Restart Game");
  restartButton.position(width / 2 - 50, height / 2 + 40);
  restartButton.mousePressed(restartGame);
  restartButton.hide();
}

function draw() {
  background(255);

  if (!gameOver) {
    handlePlayerMovement();
    mountainY += 4;

    if (frameCount % 60 === 0) {
      let spawnChance = map(player.y, height / 2, finishLineY, 100, 30);
      if (random(100) < spawnChance) arrows.push(createVector(random(width), mountainY + height));
      if (random(100) < spawnChance) food.push(createVector(random(width), mountainY + height));
      trees.push(createVector(random(width), mountainY + height));
      rocks.push(createVector(random(width), mountainY + height));
    }

    updateWendigoSpeed();
    handleCollisions();
    moveWendigo();

    drawObstacles();
    drawPowerUps();
    drawSprites();
    displayStamina();

    checkGameOver();
  } else {
    displayGameOver();
  }
}

// Adjust Wendigo speed based on player position
function updateWendigoSpeed() {
  let speedIncrease = map(player.y, height / 2, finishLineY, 1, 3);
  wendigoSpeed = constrain(speedIncrease, 1, 4);
}

// Handles player movement & slowdown effects
function handlePlayerMovement() {
  let moveSpeed = 3 - obstacleSlowdown;
  if (keyIsDown(65)) player.x -= moveSpeed;
  if (keyIsDown(68)) player.x += moveSpeed;
  if (keyIsDown(87)) player.y -= moveSpeed;
  if (keyIsDown(83)) player.y += moveSpeed;
}

// Moves Wendigo toward player but keeps it behind
function moveWendigo() {
  let currentSpeed = wendigoSpeed - arrowEffect;
  wendigo.x += (player.x - wendigo.x) * 0.02 * currentSpeed;
  wendigo.y += (player.y - wendigo.y) * 0.02 * currentSpeed;

  if (wendigo.y > player.y - 50) {
    wendigo.y = player.y - 50;
  }
}

// Draws obstacles (trees and rocks)
function drawObstacles() {
  for (let i = trees.length - 1; i >= 0; i--) {
    image(treeImg, trees[i].x, trees[i].y - mountainY, 40, 60);
    if (trees[i].y - mountainY < -50) trees.splice(i, 1);
  }

  for (let i = rocks.length - 1; i >= 0; i--) {
    image(rockImg, rocks[i].x, rocks[i].y - mountainY, 30, 30);
    if (rocks[i].y - mountainY < -50) rocks.splice(i, 1);
  }
}

// Draws power-ups (arrows and food)
function drawPowerUps() {
  for (let i = arrows.length - 1; i >= 0; i--) {
    let arrowX = arrows[i].x;
    let arrowY = arrows[i].y - mountainY;
    image(arrowImg, arrowX, arrowY, 20, 20);
    if (dist(player.x, player.y, arrowX, arrowY) < 20) {
      arrowEffect = 1.5;
      setTimeout(() => arrowEffect = 0, 5000);
      arrows.splice(i, 1);
    }
  }

  for (let i = food.length - 1; i >= 0; i--) {
    let foodX = food[i].x;
    let foodY = food[i].y - mountainY;
    image(foodImg, foodX, foodY, 20, 20);
    if (dist(player.x, player.y, foodX, foodY) < 20) {
      stamina += 20;
      food.splice(i, 1);
    }
  }
}

// Draws player and Wendigo with images
function drawSprites() {
  image(playerImg, player.x, player.y, 40, 60);
  image(wendigoImg, wendigo.x, wendigo.y, 50, 70);
}

// Handles obstacle collisions (trees and rocks slow the player down)
function handleCollisions() {
  obstacleSlowdown = 0;
  for (let i = 0; i < trees.length; i++) {
    if (dist(player.x, player.y, trees[i].x, trees[i].y - mountainY) < 30) {
      obstacleSlowdown = 1.5;
      wendigo.y += 20;
    }
  }

  for (let i = 0; i < rocks.length; i++) {
    if (dist(player.x, player.y, rocks[i].x, rocks[i].y - mountainY) < 25) {
      obstacleSlowdown = 1.5;
      wendigo.y += 20;
    }
  }

  if (stamina < 30) {
    wendigoSpeed += 1;
  }
}

// Displays stamina meter
function displayStamina() {
  stamina -= 0.05;
  fill(0);
  textSize(16);
  text("Stamina: " + stamina.toFixed(1), 20, 30);
}

// Checks for game over conditions
function checkGameOver() {
  if (stamina <= 0 || dist(player.x, player.y, wendigo.x, wendigo.y) < 25) {
    gameOver = true;
    restartButton.show();
  }

  if (player.y >= finishLineY) {
    gameOver = true;
    fill(0, 255, 0);
    textSize(32);
    text("You Escaped!", width / 2 - 80, height / 2);
    restartButton.show();
  }
}

// Displays game over screen
function displayGameOver() {
  if (stamina <= 0 || dist(player.x, player.y, wendigo.x, wendigo.y) < 25) {
    fill(255, 0, 0);
    textSize(32);
    text("Game Over!", width / 2 - 80, height / 2);
  }
}

function restartGame() {
  gameOver = false;
  stamina = 100;
  player.set(width / 2, height / 2);
  wendigo.set(random(width), player.y - 800);
  wendigoSpeed = 1;
  arrows = [];
  food = [];
  trees = [];
  rocks = [];
  mountainY = 0;
  obstacleSlowdown = 0;
  restartButton.hide();
}
