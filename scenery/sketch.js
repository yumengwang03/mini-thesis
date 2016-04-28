var sceneryRunOnce;
var poemStarted;
var skyLine;
var mountainLine;
var forestLine;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sceneryRunOnce = 0;
  poemStarted = false;
  skyLine = height / 4;
  mountainLine = height / 2.4;
  forestLine = 3 * height / 4;
}

function draw() {
  if (sceneryRunOnce < 1) {
    line(0, skyLine, width, skyLine);
    line(0, mountainLine, width, mountainLine);
    line(0, forestLine, width, forestLine);

    sceneryRunOnce++;
    poemStarted = true;
  }

  if (poemStarted) {

  }
}

function Thing(word, xPos, yPos, mode, img) {
  this.poemPos = createVector(0, 0);
  this.poemPos.set(xPos, yPos);
  this.word = word;

  this.display = function() {

  }

  this.update = function() {

  }
}