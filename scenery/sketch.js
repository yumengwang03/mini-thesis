// reference: noise wave https://p5js.org/examples/examples/Math_Noise_Wave.php
var sceneryRunOnce;
var poemStarted;
var skyLine;
var mountainLine;
var forestLine;
var waterWords = [];
var river = [];
var night;
var mountainImg;
var riverImg;
var grassList = [];
var grassLetters = [];
var grassTime = 0;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  noCanvas();
  sceneryRunOnce = 0;
  poemStarted = false;
  skyLine = height / 4;
  mountainLine = height / 2.4;
  forestLine = 3 * height / 4;
  waterWords = ["bottle", "blue", "melancholy", "destruction", "willingness", "spoken", "iridescent"];
  grassLetters = ['M', 'w', '1', 'u', 'Y', 'l'];
}

function draw() {

  if (sceneryRunOnce < 1) {
    mountainImg = createImg('img/mountain.png');
    mountainImg.size(windowWidth, windowWidth / 6);
    mountainImg.position(0, windowHeight * 0.15);
    riverImg = createImg('img/river.png');
    riverImg.size(windowWidth, windowWidth / 6);
    riverImg.position(0, windowHeight * 0.75);
    sceneryRunOnce++;
    poemStarted = true;
    var xPos = [];
    var yPos = [];
    for (var i = 0; i < 8; i++) {
      xPos.push(random(-100, 100));
      yPos.push(i * height / 4);
    }
    for (var j = 0; j < 8; j++) {
      river.push(new Water(xPos[j], yPos[j]));
    }
    for (var m = 0; m < windowWidth / 20; m++) {
      grassList[m] = [];
      for (var n = 0; n < (windowHeight * 0.75 - (windowHeight * 0.12 + windowWidth / 6)) / 20 - 1; n++) {
        grassList[m][n] = createP(grassLetters[floor(random(0, grassLetters.length))]);
        grassList[m][n].style('color', '#0EE86C');
        grassList[m][n].style('opacity', '0.8');
        grassList[m][n].position(20 * m + random(-5, 5), windowHeight * 0.1 + windowWidth / 6 + 20 * n + random(-10, 10));
        grassList[m][n].style('font-size', 0.4 + n * 0.2 + 'em');
      }
    }
  }

  if (poemStarted) {
    for (var i = 0; i < river.length; i++) {
      river[i].update();
      //river[i].reset();
    }
    for (var m = 0; m < 6; m++) {
      for (var n = 0; n < 3; n++) {
        if (millis() > grassTime + 1200) {
            if (grassList[m][n].html() == grassLetters[0]) {
              grassList[m][n].html(grassLetters[1]);
            }
          grassTime = millis();
        }
      }
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
    this.water.style('color', 'rgba(255, 230, 0, 0.8)');
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

// function Grass(letter)