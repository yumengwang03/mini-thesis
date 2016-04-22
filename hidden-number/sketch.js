var startB;
var started;
var rocks = [];
var words = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  started = false;
  words = ["terminal", "eggs", "reflective", "shadow", "nefarious", "salutation", "limpidity", "T-shirts", "grey", "proposition", "dumplings", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];

  startB = createButton('START');
  startB.position(20, 20);
  startB.mousePressed(function() {
    started = true;
  });

  for (var i = 0; i < 20; i++) {
    var rock = createButton(words[i]);
    var pos = createVector(random(0, width), random(0, height));
    rock.position(pos.x, pos.y);
    rocks.push(rock);
    rocks[i].moved = false;

    rocks[i].mousePressed(changeMoved1);
    rocks[i].mouseReleased(changeMoved2);
  }

}

function changeMoved1() {
  this.moved = true;
  // for (var i = 0; i < 20; i++) {
  //   console.log(rocks[i].moved);
  // }
};

function changeMoved2() {
  this.moved = false;
  // for (var i = 0; i < 20; i++) {
  //   console.log(rocks[i].moved);
  // }
};


function draw() {
  if (started) {
    for (var i = 0; i < 20; i++) {
      if (rocks[i].moved) {
        rocks[i].position(mouseX - 20, mouseY - 10);
      }
    }
  }
}


function Rock(posX, posY, word) {
  this.pos = createVector(0, 0);
  this.pos.set(posX, posY);
  this.word = word;
  this.wordRock;
  this.moved;

  this.wordRock = createButton(this.word);
  this.wordRock.position(this.pos.x, this.pos.y);

  this.wordRock.mousePressed(changeMoved1);
  this.wordRock.mouseReleased(changeMoved2);

  this.display = function() {};

  this.update = function() {
    if (moved) {
      console.log(this.word);
      this.pos.x = mouseX - 20;
      this.pos.y = mouseY - 10;
      this.wordRock.position(this.pos.x, this.pos.y);
    }
  };
}