// reference: noise wave https://p5js.org/examples/examples/Math_Noise_Wave.php
var sceneryRunOnce;
var poemStarted;
var skyLine;
var mountainLine;
var forestLine;
var waterWords = [];
var river = [];
var night;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  noCanvas();
  sceneryRunOnce = 0;
  poemStarted = false;
  skyLine = height / 4;
  mountainLine = height / 2.4;
  forestLine = 3 * height / 4;
  waterWords = ["bottle", "blue", "melancholy", "destruction", "willingness", "spoken", "iridescent"];
}

function draw() {
  background(255);
  if (sceneryRunOnce < 1) {
    
    night = createDiv('');
    night.size(windowWidth, windowHeight);
    night.position(0,0);
    night.style('background-color', 'black');
    sceneryRunOnce++;
    poemStarted = true;
    var xPos = [];
    var yPos = [];
    for (var i = 0; i < 8; i++) {
      xPos.push(random(-100, 100));
      yPos.push(i * height/4);
    }
    for (var j = 0; j < 8; j++) {
      river.push(new Water(xPos[j], yPos[j]));
    }
  }

  if (poemStarted) {
    for (var i = 0; i < river.length; i++) {
      river[i].update();
      //river[i].reset();
    }
  }
}

function Water(xPos, yPos) {
  this.waterList = [];
  this.waterPos = [];
  this.yoff = 0;
  this.xUpdate = 0;
  for (var i = 0; i < windowWidth / 100 - 1; i++) {
    this.water = createP(waterWords[floor(random(0, waterWords.length))]);
    this.water.style('font-family', 'monospace');
    this.water.style('color', '#FFEA00');
    this.waterList.push(this.water);
    this.waterPos[i] = createVector(0, 0);
  }

  this.update = function() {
    this.xoff = 0;
    for (var x = 0; x < this.waterList.length; x++) {
      this.y = map(noise(this.xoff, this.yoff), 0, 1, 0.6 * windowHeight, windowHeight);
      this.waterPos[x].x = 100 * x + xPos + this.xUpdate;
      this.waterPos[x].y = this.y + yPos;
      this.xoff += 0.05;
    }
    this.yoff += 0.01;
    //this.xUpdate += 5;

    for (var m = 0; m < this.waterList.length; m++) {
      this.waterPos[m].x += 3;
      this.waterList[m].position(this.waterPos[m].x, this.waterPos[m].y);
    }
  };

  this.reset = function() {
    for (var i = 0; i < this.waterList.length; i++) {
      if (this.waterPos[i].x > windowWidth + 200) {
        this.xUpdate = -200;
        this.waterPos[i].x = 100 * i + xPos + this.xUpdate;
      }
    }
  };

}