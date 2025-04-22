let player;
let obstacles = [];
let exitZone;

function setup() {
    createCanvas(600, 400);
    createPlayer();
    createObstacles();
    createExit();
}

function draw() {
    background(220);
    drawBorders();
    movePlayer();
    drawPlayer();
    drawObstacles();
    drawExit();
    checkWinCondition();
}

function createPlayer() {
    player = { x: 50, y: 50, size: 20, speed: 3 };
}

function movePlayer() {
    if (keyIsDown(65)) player.x -= player.speed; // A key (move left)
    if (keyIsDown(68)) player.x += player.speed; // D key (move right)
    if (keyIsDown(87)) player.y -= player.speed; // W key (move up)
    if (keyIsDown(83)) player.y += player.speed; // S key (move down)
}

function drawPlayer() {
    fill(0, 0, 255);
    rect(player.x, player.y, player.size, player.size);
}

function createObstacles() {
    for (let i = 0; i < 2; i++) {
        obstacles.push({
            x: random(width),
            y: random(height),
            size: random(30, 50),
            speedX: random(-2, 2),
            speedY: random(-2, 2),
            color: color(random(255), random(255), random(255))
        });
    }
}

function drawObstacles() {
    for (let obs of obstacles) {
        fill(obs.color);
        ellipse(obs.x, obs.y, obs.size, obs.size);
        obs.x += obs.speedX;
        obs.y += obs.speedY;

        // Wrap around screen edges
        if (obs.x > width) obs.x = 0;
        if (obs.x < 0) obs.x = width;
        if (obs.y > height) obs.y = 0;
        if (obs.y < 0) obs.y = height;
    }
}

function drawBorders() {
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(0, 0, width, height);
}

function createExit() {
    exitZone = { x: width - 60, y: height - 60, size: 30 };
}

function drawExit() {
    fill(0, 255, 0);
    rect(exitZone.x, exitZone.y, exitZone.size, exitZone.size);
    
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Exit", exitZone.x - 20, exitZone.y + exitZone.size / 2);
}

function checkWinCondition() {
    if (player.x > exitZone.x && player.y > exitZone.y) {
        displayWinMessage();
    }
}

function displayWinMessage() {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
}
