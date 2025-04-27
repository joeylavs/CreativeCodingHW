let obstacles = [];
let exit;
let player;
let gameWon = false;

function setup() {
  createCanvas(800, 600);

  // Create player
  player = {
    x: 50,
    y: 50,
    size: 30,
    speed: 4,
  };

  // Create at least 5 obstacles of different sizes and colors
  for (let i = 0; i < 5; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      size: random(30, 80),
      color: color(random(255), random(255), random(255)),
      speedX: random(-3, 3),
      speedY: random(-3, 3),
    });
  }

  // Set exit position
  exit = { x: width - 50, y: height - 50, size: 40 };
}

function draw() {
  background(220);

  // Move obstacles randomly
  for (let obs of obstacles) {
    fill(obs.color);
    ellipse(obs.x, obs.y, obs.size);

    if (!gameWon) {
      obs.x += obs.speedX;
      obs.y += obs.speedY;

      // Wrap around if obstacles leave the screen
      if (obs.x > width) obs.x = 0;
      if (obs.x < 0) obs.x = width;
      if (obs.y > height) obs.y = 0;
      if (obs.y < 0) obs.y = height;
    }
  }

  // Draw player
  fill(0, 0, 255);
  ellipse(player.x, player.y, player.size);

  // Draw exit
  fill(0, 255, 0);
  rect(exit.x, exit.y, exit.size, exit.size);

  // Move player with WASD
  if (keyIsDown(87)) player.y -= player.speed; // W - up
  if (keyIsDown(83)) player.y += player.speed; // S - down
  if (keyIsDown(65)) player.x -= player.speed; // A - left
  if (keyIsDown(68)) player.x += player.speed; // D - right

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
  // Add a new non-moving obstacle on click
  obstacles.push({
    x: mouseX,
    y: mouseY,
    size: random(20, 60),
    color: color(random(255), random(255), random(255)),
    speedX: 0,
    speedY: 0,
  });
}
