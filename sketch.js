let canvasXY = 500;

let instances = [];

let previewLineStart;
let previewing = false;
let g;
let frick; // FRIction dynamic Koefficient
let air_k = 0.8; // air friction;
let bounce_loss = 0.8;

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = createVector(0, 0);
  }

  bounceX() {
    this.v.x = -this.v.x * bounce_loss;
  }

  bounceY() {
    this.v.y = -this.v.y * bounce_loss;
  }

  update() {
    this.v.add(g);
    this.x += this.v.x * deltaTime;
    this.y += this.v.y * deltaTime;

    if (this.x - this.r < 0 || this.x + this.r > canvasXY) {
      this.bounceX();
      this.x = constrain(this.x, this.r, canvasXY - this.r);
    }
    if (this.y - this.r < 0 || this.y + this.r > canvasXY) {
      this.bounceY();
      this.y = constrain(this.y, this.r, canvasXY - this.r);
      if (this.v.x < 0) {
        frick.x = 0.5;
      } else if (this.v.x > 0) {
        frick.x = -0.5;
      } else {
        frick.x = 0;
      }
      this.v.add(frick);
    }
    if (abs(this.v.x - frick.x) <= frick.x) {
        this.v.x = 0;
    }
  }

  draw() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.r, this.r);
  }
}

function preview() {
  if (previewing) {
    fill(255);
    line(previewLineStart.x, previewLineStart.y, mouseX, mouseY);
  }
}

function mouseClicked() {
  if (previewing) {
    previewing = false;
    let ball = new Ball(previewLineStart.x, previewLineStart.y, canvasXY / 10);
    ball.v.x = (mouseX - previewLineStart.x)/60;
    ball.v.y = (mouseY - previewLineStart.y)/60;
    instances.push(ball);
  } else {
    previewing = true;
    previewLineStart.x = mouseX;
    previewLineStart.y = mouseY;
  }
}

function setup() {
  //PHYSICAL CONSTANTS
  g = createVector(0, 0.1);
  frick = createVector(0.5,0); // friction

  ///
  previewLineStart = createVector(0,0);
  createCanvas(canvasXY, canvasXY);
  frameRate(60);
}

function draw() {
  clear();
  stroke(255);
  background(0);

  preview();

  for (let i = 0; i < instances.length; i++) {
    instances[i].draw();
    instances[i].update();
  }
}
