let player;
let obstacles = [];
let exit;
let staticObstacles = [];

function setup() {
  createCanvas(600, 400);
  player = new Player(width / 2, height / 2);
  
  // Create moving obstacles
  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle(random(width), random(height)));
  }

  // Define the exit area
  exit = { x: width - 50, y: height - 50, size: 40 };
}

function draw() {
  background(220);
  
  // Draw exit zone
  fill(0, 255, 0);
  rect(exit.x, exit.y, exit.size, exit.size);
  
  // Move and display obstacles
  for (let obstacle of obstacles) {
    obstacle.move();
    obstacle.wrap();
    obstacle.display();
  }
  
  // Draw static obstacles
  for (let sObstacle of staticObstacles) {
    sObstacle.display();
  }
  
  // Move player and check if they win
  player.move();
  player.wrap();
  player.display();
  
  if (player.x > exit.x && player.y > exit.y) {
    textSize(32);
    fill(0);
    text("You Win!", width / 2 - 50, height / 2);
    noLoop(); // Stop the game
  }
}

// Player object
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }
  
  move() {
    if (keyIsDown(65)) this.x -= 2; // 'A' key for left
    if (keyIsDown(68)) this.x += 2; // 'D' key for right
    if (keyIsDown(87)) this.y -= 2; // 'W' key for up
    if (keyIsDown(83)) this.y += 2; // 'S' key for down
  }
  
  wrap() {
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
  
  display() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size);
  }
}

// Moving Obstacle object
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 40);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }
  
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  
  wrap() {
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
  
  display() {
    fill(random(255), random(255), random(255));
    rect(this.x, this.y, this.size, this.size);
  }
}

// Static obstacle placement (on mouse click)
function mousePressed() {
  staticObstacles.push(new Obstacle(mouseX, mouseY));
}
