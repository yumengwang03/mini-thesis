var sceneryRunOnce;
var poemStarted;

function setup() {
  sceneryRunOnce = 0;
  poemStarted = false;
}

function draw() {
  if (sceneryRunOnce < 1) {
  
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