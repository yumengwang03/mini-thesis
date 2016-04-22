var startB;
var started;
var rocks = [];
var words = [];
var moveStarted;


function setup() {
  createCanvas(windowWidth, windowHeight);
  started = false;
  words = ["terminal", "eggs", "reflective", "shadow", "nefarious", "salutation", "limpidity", "T-shirts", "grey", "proposition", "dumplings", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];

  startB = createButton('START');
  startB.position(20, 20);
  startB.mousePressed(function() {
    started = true;
  });
}

function changeMoved1() {
  this.moved = true;
};

function changeMoved2() {
  this.moved = false;
};


function draw() {
  if (started) {
    for (var i = 0; i < words.length; i++) {
      rocks.push(new Rock(random(0, width), random(0, height), words[i]));
    }
    started = false;
    moveStarted = true;
  }

  if (moveStarted) {
    for (var i = 0; i < words.length; i++) {
      rocks[i].update();
    }
  }
}


function Rock(posX, posY, word) {
  this.pos = createVector(0, 0);
  this.pos.set(posX, posY);
  this.word = word;
  this.wordRock = createButton(this.word);
  this.wordRock.style('background', 'url(img/Logo.jpg)');
  this.wordRock.size(100, 120);
  this.wordRock.moved = false;
  this.wordRock.position(this.pos.x, this.pos.y);

  this.wordRock.mousePressed(changeMoved1);
  this.wordRock.mouseReleased(changeMoved2);

  this.update = function() {
    if (this.wordRock.moved) {
      this.pos.x = mouseX - 20;
      this.pos.y = mouseY - 10;
      this.wordRock.position(this.pos.x, this.pos.y);
    }
  };
}