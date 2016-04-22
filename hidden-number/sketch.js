var startB;
var started;
var rocks = [];
var words = [];
var moveStarted;
var pitSize;



function setup() {
  createCanvas(windowWidth, windowHeight);
  started = false;
  words = ["terminal", "eggs", "reflective", "shadow", "nefarious", "salutation", "limpidity", "T-shirts", "grey", "proposition", "dumplings", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];

  startB = createButton('START');
  startB.position(20, 20);
  startB.mousePressed(function() {
    started = true;
  });

  pitSize = height / 2;
}

function changeMoved1() {
  this.moved = true;
};

function changeMoved2() {
  this.moved = false;
};


function draw() {
  if (started) {
    var r = 4;
    var c = 5;
    for (var i = 0; i < words.length; i++) {
      var unitX = width / c;
      var unitY = height / r;
      // sometimes I am good at math
      var numPos = createVector(((i + c) % c) * unitX + random(0, unitX - 120), ((i + r) % r) * unitY + random(0, unitY - 120)); //to draw them in a grid with some randomness
      var safeDist = dist(numPos.x, numPos.y, width / 2, height / 2);
      if (safeDist >= pitSize / 2 + 80) {
        rocks.push(new Rock(numPos.x, numPos.y, words[i]));
      }
    }
    started = false;
    moveStarted = true;
  }

  //console.log(rocks);
  if (moveStarted) {
    for (var i = 0; i < words.length; i++) {
      rocks[i].update();
    }
  }

  ellipse(width / 2, height / 2, pitSize, pitSize);
}


function Rock(posX, posY, word) {
  this.pos = createVector(0, 0);
  this.size = createVector(120, 120);
  this.pos.set(posX, posY);
  this.word = word;
  this.wordRock = createButton(this.word);
  this.wordRock.style('background', 'url(img/Logo.jpg)');
  this.wordRock.size(this.size.x, this.size.y);
  this.wordRock.moved = false;
  this.wordRock.position(this.pos.x, this.pos.y);

  this.wordRock.mousePressed(changeMoved1);
  this.wordRock.mouseReleased(changeMoved2);

  this.update = function() {
    if (this.wordRock.moved) {
      this.pos.x = mouseX - this.size.x / 2;
      this.pos.y = mouseY - this.size.y / 2;
      this.wordRock.position(this.pos.x, this.pos.y);
    }
  };
}