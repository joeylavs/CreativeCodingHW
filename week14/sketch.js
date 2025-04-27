class Obstacle {
    constructor(x, y, size, color, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  
    move() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      // Wrap around if obstacles leave the screen
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }
  
    display() {
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
  }
  
  class Player {
    constructor(x, y, size, speed) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
    }
  
    move() {
      if (keyIsDown(87)) this.y -= this.speed; // W - up
      if (keyIsDown(83)) this.y += this.speed; // S - down
      if (keyIsDown(65)) this.x -= this.speed; // A - left
      if (keyIsDown(68)) this.x += this.speed; // D - right
    }
  
    display() {
      fill(0, 0, 255);
      ellipse(this.x, this.y, this.size);
    }
  }
  
  let obstacles = [];
  let exit;
  let player;
  let gameWon = false;
  
  function setup() {
    createCanvas(800, 600);
  
    // Create player using class
    player = new Player(50, 50, 30, 4);
  
    // Create at least 5 obstacles of different sizes and colors using class
    for (let i = 0; i < 5; i++) {
      obstacles.push(new Obstacle(
        random(width),
        random(height),
        random(30, 80),
        color(random(255), random(255), random(255)),
        random(-3, 3),
        random(-3, 3)
      ));
    }
  
    // Set exit position
    exit = { x: width - 50, y: height - 50, size: 40 };
  }
  
  function draw() {
    background(220);
  
    // Move and display obstacles
    for (let obs of obstacles) {
      obs.move();
      obs.display();
    }
  
    // Move and display player
    player.move();
    player.display();
  
    // Draw exit
    fill(0, 255, 0);
    rect(exit.x, exit.y, exit.size, exit.size);
  
    // Check if player reaches exit
    if (!gameWon && dist(player.x, player.y, exit.x + exit.size / 2, exit.y + exit.size / 2) < exit.size) {
      gameWon = true;
    }
  
    // Display win message
    if (gameWon) {
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("YOU WIN!", width / 2, height / 2);
    }
  }
  
  function mousePressed() {
    // Add a new non-moving obstacle on click using class
    obstacles.push(new Obstacle(
      mouseX,
      mouseY,
      random(20, 60),
      color(random(255), random(255), random(255)),
      0,
      0
    ));
  }
  