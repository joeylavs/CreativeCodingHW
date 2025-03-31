function setup() {
    createCanvas(400, 400);
    background(220);
  
    // Face
    fill(210, 180, 140); // Brown skin tone
    ellipse(200, 200, 150, 200); // Oval face
  
    // Eyes
    fill(255);
    ellipse(170, 180, 40, 20); // Left eye
    ellipse(230, 180, 40, 20); // Right eye
    fill(65, 42, 25); // Brown pupils
    ellipse(170, 180, 10, 10); // Left pupil
    ellipse(230, 180, 10, 10); // Right pupil
  
    // Hair
    fill(0); // Black hair color
    arc(200, 140, 160, 100, PI, TWO_PI); // Top hair
  
    // Nose
    stroke(0);
    line(200, 190, 200, 230); // Nose line
  
    // Mouth
    noFill();
    arc(200, 250, 80, 40, 0, PI); // Smiling arc
  
    // Title
    fill(0);
    textSize(16);
    text("Self-Portrait", 10, 30);
  
    // Signature
    textSize(12);
    text("By Joey Laverdure", 300, 380);
  }
  