let player;
let obstacles = [];
let exit;
let gameWon = false;

function setup() {
  createCanvas(600, 400);
  
  // Initialize player
  player = new Player();
  
  // Create obstacles (random shapes)
  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle(random(width), random(height), random(20, 50), random(20, 50), color(random(255), random(255), random(255))));
  }
  
  // Create exit
  exit = new Exit(width - 50, height - 50, 40, 40);
}

function draw() {
  background(220);
  
  if (gameWon) {
    textSize(32);
    fill(0);
    text("You Win!", width / 2 - 50, height / 2);
    return;
  }
  
  // Handle continuous movement
  player.handleMovement();

  // Draw exit
  exit.display();
  
  // Draw player
  player.update();
  player.display();
  
  // Update and draw obstacles
  for (let obs of obstacles) {
    obs.update();
    obs.display();
  }
  
  // Check if player reached exit
  if (player.reaches(exit)) {
    gameWon = true;
  }
}

class Player {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.size = 30;
    this.speed = 5; // Adjusted speed for smoother movement
  }
  
  update() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  
  display() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.size, this.size);
  }
  
  handleMovement() {
    if (keyIsDown(65)) this.x -= this.speed; // 'A' - Move left
    if (keyIsDown(68)) this.x += this.speed; // 'D' - Move right
    if (keyIsDown(87)) this.y -= this.speed; // 'W' - Move up
    if (keyIsDown(83)) this.y += this.speed; // 'S' - Move down
  }

  reaches(exit) {
    return this.x < exit.x + exit.w &&
           this.x + this.size > exit.x &&
           this.y < exit.y + exit.h &&
           this.y + this.size > exit.y;
  }
}

class Obstacle {
  constructor(x, y, w, h, col, movable = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.movable = movable;
    this.speedX = movable ? random(-2, 2) : 0;
    this.speedY = movable ? random(-2, 2) : 0;
  }
  
  update() {
    if (this.movable) {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Wrap obstacles around screen edges
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
  }
  
  display() {
    fill(this.col);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Exit {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  display() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}
