let textX = 300;
let textY = 380;
let textSpeedX = 2;
let textSpeedY = 2;
let direction = "right";

let eyeX = 170;
let eyeY = 180;
let eyeSpeedX = 2;
let eyeSpeedY = 1.5;
let eyeColor;

let mouthY = 250;
let mouthSpeedY = 1;
let mouthColor;

let titleSize = 16;
let titleDirection = 1;
let titleCounter = 0;

let headSize = 150;
let headDirection = 1;

function setup() {
  createCanvas(400, 400);
  eyeColor = color(255);
  mouthColor = color(0);
}

function draw() {
  background(220);

  // Animated Head Size
  fill(210, 180, 140);
  ellipse(200, 200, headSize, headSize + 50);
  
  headSize += headDirection;
  if (headSize > 180 || headSize < 120) {
    headDirection *= -1;
  }

  // Animated Eyes (changing color when hitting walls)
  fill(eyeColor);
  ellipse(eyeX, eyeY, 40, 20);
  ellipse(eyeX + 60, eyeY, 40, 20);
  
  fill(65, 42, 25);
  ellipse(eyeX, eyeY, 10, 10);
  ellipse(eyeX + 60, eyeY, 10, 10);

  eyeX += eyeSpeedX;
  if (eyeX > 230 || eyeX < 170) {
    eyeSpeedX *= -1;
    eyeColor = color(random(255), random(255), random(255)); // Change color
  }

  eyeY += eyeSpeedY;
  if (eyeY > 190 || eyeY < 170) {
    eyeSpeedY *= -1;
    eyeColor = color(random(255), random(255), random(255)); // Change color
  }

  // Animated Mouth (changing color when hitting walls)
  stroke(mouthColor);
  noFill();
  arc(200, mouthY, 80, 40, 0, PI);
  
  mouthY += mouthSpeedY;
  if (mouthY > 260 || mouthY < 240) {
    mouthSpeedY *= -1;
    mouthColor = color(random(255), random(255), random(255)); // Change color
  }

  // Hair
  fill(0);
  arc(200, 140, 160, 100, PI, TWO_PI);

  // Nose
  stroke(0);
  line(200, 190, 200, 230);

  // Animated Title
  fill(0);
  textSize(titleSize);
  text("Self-Portrait", 10, 30);

  titleSize += titleDirection;
  titleCounter++;

  if (titleCounter >= 5) {
    titleDirection *= -1;
    titleCounter = 0;
  }

  // Animated Name Text in Square Pattern
  textSize(12);
  text("By Joey Laverdure", textX, textY);

  if (direction === "right") {
    textX += textSpeedX;
    if (textX >= 340) direction = "down";
  } else if (direction === "down") {
    textY += textSpeedY;
    if (textY >= 400) direction = "left";
  } else if (direction === "left") {
    textX -= textSpeedX;
    if (textX <= 260) direction = "up";
  } else if (direction === "up") {
    textY -= textSpeedY;
    if (textY <= 360) direction = "right";
  }
}
