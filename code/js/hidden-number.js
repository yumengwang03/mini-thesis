var rocks = [];
var words = [];
var posList = [];
var hiddenPos = [];
var moveStarted = false;
var runOnce;
var pitSize;
var rockSize;
var pitImg;
var rockMsg = [];
var showHiddenButton = 0;

function numberSetup() {
  //noCanvas();
  //createCanvas(windowWidth, windowHeight);
  //numStarted = false;
  words = ["terminal", "eggs", "reflective", "shadow", "nefarious", "salutation", "limpidity", "T-shirts", "grey", "proposition", "dumplings", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
  runOnce = 0;

  // startB = createButton('START');
  // startB.position(20, 20);
  // startB.mousePressed(function() {
  //   started = true;
  // });

  pitSize = height / 2 + 60;
  rockSize = 120;

  var sevenSize = pitSize / 8;
  var seven0 = createVector(width / 2 - 1.2 * sevenSize, height / 2 - sevenSize);
  var seven1 = createVector(width / 2 - 0.2 * sevenSize, height / 2 - sevenSize);
  var seven2 = createVector(width / 2 + 0.8 * sevenSize, height / 2 - sevenSize);
  var seven3 = createVector(width / 2 + 0.6 * sevenSize, height / 2);
  var seven4 = createVector(width / 2 + 0.4 * sevenSize, height / 2 + sevenSize);
  var seven5 = createVector(width / 2 + 0.2 * sevenSize, height / 2 + 2 * sevenSize);
  hiddenPos = [seven0, seven1, seven2, seven3, seven4, seven5];
}

function changeMoved1() {
  var stopDist = dist(mouseX, mouseY, width / 2, height / 2);
  if (stopDist > pitSize / 2 - 40) {
    this.moved = true;
  }
};

function changeMoved2() {
  this.moved = false;
};


function numberDraw() {
  // imageMode(CENTER);
  // image(pitImg, width / 2 - 10, height / 2, pitSize * 2.5, pitSize * 1.8);

  if (runOnce < 1) {
    pitImg = createImg('img/purple.png');
    pitImg.position(width / 2 - pitSize * 2.5 / 2, 0);
    pitImg.size(pitSize * 2.5, height);
    var r = 4;
    var c = 5;
    for (var i = 0; i < words.length; i++) {
      var unitX = width / c;
      var unitY = height / r;

      // sometimes I am good at math
      // set rock positions in a grid with some randomness to distribute them evenly in the beginning
      var numPos = createVector(((i + c) % c) * unitX + random(0, unitX - rockSize), ((i + r) % r) * unitY + random(0, unitY - rockSize));

      // do not draw in the circle
      var safeDist = dist(numPos.x, numPos.y, width / 2, height / 2);
      if (safeDist >= pitSize / 2 + 80) {
        posList.push(numPos);
      }
    }

    for (var j = 0; j < posList.length; j++) {
      rocks.push(new Rock(posList[j].x, posList[j].y, words[j]));
    }
    runOnce++;
    moveStarted = true;
  }

  if (moveStarted) {
    for (var i = 0; i < posList.length; i++) {
      rocks[i].update();
      if (hiddenPos.length > 0) {
        rocks[i].fall(hiddenPos[0].x, hiddenPos[0].y, 1);
      } else {
        rocks[i].fall(random(0, width - 2 * rockSize), random(0, height - 2 * rockSize), 0);
        if (showHiddenButton < 1) {
          forceNextB = createButton('keep going');
          forceNextB.class('continueButton-day');
          forceNextB.mousePressed(storyBox);
          showHiddenButton++;
        }
      }
    }
  }
}


function Rock(posX, posY, word) {
  this.pos = createVector(0, 0);
  this.pos.set(posX, posY);
  this.word = word;
  this.wordRock = createButton(this.word);
  this.wordRock.size(rockSize, rockSize);
  this.wordRock.moved = false;
  this.wordRock.position(this.pos.x, this.pos.y);
  this.rockImg = ['url(img/rock1.png)', 'url(img/rock2.png)', 'url(img/rock3.png)', 'url(img/rock4.png)', 'url(img/rock5.png)', 'url(img/rock6.png)'];
  this.runTime = 0;

  this.wordRock.style('background', this.rockImg[floor(random(0, 6))]);
  this.wordRock.style('background-size', '100%');
  this.wordRock.style('outline', 'none');
  this.wordRock.style('font-family', 'monospace');
  this.wordRock.style('font-size', '1.2em');
  //this.wordRock.style('font-weight', 'bold');
  this.wordRock.style('border', 'white');
  this.wordRock.style('color', '#0FE9CE');
  this.wordRock.style('border-radius', '20px');

  this.wordRock.mousePressed(changeMoved1);
  this.wordRock.mouseReleased(changeMoved2);

  this.update = function() {
    if (this.wordRock.moved) {
      this.pos.x = mouseX - rockSize / 2;
      this.pos.y = mouseY - rockSize / 2;
      this.wordRock.position(this.pos.x, this.pos.y);
    }
  };

  this.fall = function(hidPosX, hidPosY, updatedRockSize) {
    // for (var i = 0; i < hiddenPos.length; i++) {
    //   ellipse(hiddenPos[i].x, hiddenPos[i].y, 20, 20);
    // }
    this.newSafeDist = dist(this.pos.x, this.pos.y, width / 2, height / 2);
    if (this.newSafeDist <= pitSize / 2 && !this.wordRock.moved && this.runTime < 1) {
      if (updatedRockSize == 1) {
        rockMsg.push(this.wordRock.html());
        this.wordRock.size(rockSize / 2.5, rockSize / 2.5);
        this.wordRock.html('');
      } else if (updatedRockSize == 0) {
        this.wordRock.size(rockSize, rockSize);
      }
      this.pos.x = hidPosX;
      this.pos.y = hidPosY;
      this.wordRock.position(this.pos.x - 25, this.pos.y - 25);
      hiddenPos.splice(0, 1);
      this.runTime++;
    }
  };
}