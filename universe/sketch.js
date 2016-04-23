var stars = [];
var starWords = [];
var starPosList = [];
var starRunOnce;
var starStarted;
var starSize;
var starImg;
var shipPos;
var shipSize;
var spaceship;
var startTravel;
var updatePos;


function setup() {
  createCanvas(windowWidth, windowHeight);
  starRunOnce = 0;
  starStarted = false;
  starSize = 180;
  starWords = ["pleasing", "complementary", "transparent", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
  starImg = ['url(img/planet1.png)', 'url(img/planet2.png)', 'url(img/planet3.png)', 'url(img/planet4.png)', 'url(img/planet5.png)', 'url(img/planet6.png)', 'url(img/planet7.png)', 'url(img/planet8.png)', 'url(img/planet9.png)', 'url(img/planet10.png)', 'url(img/planet11.png)', 'url(img/planet12.png)'];
  startTravel = false;

}

function draw() {
  if (starRunOnce < 1) {
    //background(220, 235, 255);

    var r = 3;
    var c = 4;
    for (var i = 0; i < starWords.length; i++) {
      var unitX = (width - 200) / c;
      var unitY = (height - 100) / r;
      var starPos = createVector(((i + c) % c) * unitX + random(0, unitX - starSize) + 100, ((i + r) % r) * unitY + random(0, unitY - starSize) + 50);
      starPosList.push(starPos);
    }
    for (var j = 0; j < starWords.length; j++) {
      stars.push(new Star(starWords[j], starPosList[j].x, starPosList[j].y, floor(random(0, 3)), starImg[j]));
    }

    // spaceship
    shipPos = createVector(20, random(0, height));
    updatePos = createVector(0, 0);
    shipSize = 50;
    spaceship = createButton('test');
    spaceship.position(shipPos.x, shipPos.y);
    spaceship.size(shipSize, shipSize);

    starRunOnce++;
    starStarted = true;
  }

  if (starStarted) {
    for (var i = 0; i < starWords.length; i++) {
      stars[i].update();
      stars[i].display();
    }

    if (updatePos.x != 0 && updatePos.y != 0 && startTravel) {
      shipPos.x = lerp(shipPos.x, updatePos.x, 0.03);
      shipPos.y = lerp(shipPos.y, updatePos.y, 0.03);

      spaceship.position(shipPos.x, shipPos.y);
      if (dist(shipPos.x + starSize / 4, shipPos.y + starSize / 4, updatePos.x + shipSize / 2, updatePos.y + shipSize / 2) < 10) {
        startTravel = false;
      }
    }
  }
}

function Star(adj, xPos, yPos, mode, img) {
  this.starPos = createVector(0, 0);
  this.starPos.set(xPos, yPos);
  this.adj = adj;
  this.mode = mode;
  this.adjStar = createButton(this.adj);
  this.adjStar.position(this.starPos.x, this.starPos.y);
  this.angle = random(0, 2 * PI);


  this.adjStar.style('background', img);
  this.adjStar.style('background-size', '100%');
  this.adjStar.style('outline', 'none');
  this.adjStar.style('font-family', 'monospace');
  this.adjStar.style('font-size', '1.4em');
  this.adjStar.style('border', 'white');
  this.adjStar.style('color', 'navy');
  this.adjStar.style('border-radius', '80px');

  this.display = function() {
    switch (this.mode) {
      case 0:
        this.adjStar.size(starSize, starSize - 20);
        break;
      case 1:
        this.adjStar.size(0.8 * starSize, 0.8 * (starSize - 20));
        break;
      case 2:
        this.adjStar.size(0.7 * starSize, 0.7 * (starSize - 20));
        break;
      case 3:
        this.adjStar.size(0.6 * starSize, 0.6 * (starSize - 20));
        break;
    }
  }

  this.update = function() {
    switch (this.mode) {
      case 0:
        this.s = starSize / 220;
        this.starPos.x += this.s * sin(this.angle);
        this.starPos.y += this.s * cos(this.angle);
        this.angle += 0.02;
        break;
      case 1:
        this.s = starSize / 150;
        this.starPos.x += this.s / 2 * sin(this.angle);
        this.starPos.y += this.s * cos(this.angle);
        this.angle += 0.03;
        break;
      case 2:
        this.s = starSize / 160;
        this.starPos.x += this.s * sin(this.angle);
        this.starPos.y += this.s / 2 * cos(this.angle);
        this.angle += 0.03;
        break;
      case 3:
        this.s = starSize / 180;
        this.starPos.x += this.s / 2 * sin(this.angle);
        this.starPos.y += this.s / 3 * cos(this.angle);
        this.angle += 0.01;
        break;
    }
    this.adjStar.position(this.starPos.x, this.starPos.y);
  };

  this.adjStar.mousePressed(travel);
}

function travel() {
  //this.style('background', 'grey');
  updatePos.x = this.x + starSize / 4;
  updatePos.y = this.y + starSize / 4;
  startTravel = true;
}