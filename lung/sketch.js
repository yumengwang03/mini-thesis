var lungImg;
var lungRunOnce;
var lungStarted;
var airWords = [];
var airList = [];
var randomLungPos = [];
var lungSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noCanvas();
  lungSize = 400;
  lungRunOnce = 0;
  lungStarted = false;
  airWords = ["pleasing", "complementary", "transparent", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
}

function draw() {
  if (lungRunOnce < 1) {
    lungImg = createImg('img/test.png');
    lungImg.size(lungSize, lungSize);
    for (var j = 0; j < 100; j++) {
      var lungPos = createVector((Math.round(Math.random()) * 2 - 1) * random(40, lungSize / 2 - 20), random(40, lungSize * 1.2));
      randomLungPos.push(lungPos);
    }
    //console.log(randomLungPos);
    for (var i = 0; i < 100; i++) {
      airList.push(new Air(airWords[floor(random(0, airWords.length))], random(0, width - 100), random(160, height - 20), randomLungPos[i].x, randomLungPos[i].y));
    }
    lungRunOnce++;
    lungStarted = true;
  }

  if (lungStarted) {
    lungImg.position(mouseX - 150, mouseY);
    for (var i = 0; i < airList.length; i++) {
      //airList[i].display();
      airList[i].update();
    }
  }
}

function Air(word, xPos, yPos, randomPosX, randomPosY) {
  this.airPos = createVector(0, 0);
  this.airPos.set(xPos, yPos);
  this.randomPos = createVector(randomPosX, randomPosY);
  this.word = word;
  this.air = createP(word);
  this.air.class("air");
  this.air.position(this.airPos.x, this.airPos.y);
  this.airEntered = false;
  this.airEntered2 = false;

  this.display = function() {

  };

  this.update = function() {
    this.safeDist = dist(this.airPos.x, this.airPos.y, mouseX, mouseY);
    if (this.safeDist <= 200) {
      this.airEntered = true;
    }
    if (this.airEntered) {
      this.airPos.x = lerp(this.airPos.x, mouseX, 0.03);
      this.airPos.y = lerp(this.airPos.y, mouseY, 0.03);
      this.air.position(this.airPos.x, this.airPos.y);
      if (dist(this.airPos.x, this.airPos.y, mouseX, mouseY) <= 20) {
        this.airEntered2 = true;
        //this.airEntered = false;
      }
    }
    if (this.airEntered2) {
      this.airEntered.false;
      this.safeDist2 = dist(this.airPos.x, this.airPos.y, mouseX + 0.5 * lungSize, mouseY + 0.5 * lungSize);
      this.airPos.x = lerp(this.airPos.x, mouseX + this.randomPos.x, 0.03);
      this.airPos.y = lerp(this.airPos.y, mouseY + this.randomPos.y, 0.03);
      this.air.position(this.airPos.x, this.airPos.y);
      this.air.style('color', 'salmon');

      // this.closeDist = dist(this.airPos.x, this.airPos.y, mouseX + this.randomPos.x, mouseY + this.randomPos.y);
      // this.close = false;
      // if (this.closeDist <= 60) {
      //   this.close = true;
      // }
      // if (this.close) {
      //   this.airPos.set(mouseX + this.randomPos.x, mouseY + this.randomPos.y);
      // }
    }
  };





}