var stars = [];
var starWords = [];
var starPosList = [];
var starRunOnce;
var starStarted;
var starSize;
var starImg;


function setup() {
  createCanvas(windowWidth, windowHeight);
  starRunOnce = 0;
  starStarted = false;
  starSize = 200;
  starWords = ["pleasing", "complementary", "transparent", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
  starImg = ['url(img/planet1.png)', 'url(img/planet2.png)', 'url(img/planet3.png)', 'url(img/planet4.png)', 'url(img/planet5.png)', 'url(img/planet6.png)', 'url(img/planet7.png)', 'url(img/planet8.png)', 'url(img/planet9.png)', 'url(img/planet10.png)', 'url(img/planet11.png)', 'url(img/planet12.png)'];
}

function draw() {
  if (starRunOnce < 1) {
    background(220, 235, 255);
    var r = 3;
    var c = 4;
    for (var i = 0; i < starWords.length; i++) {
      var unitX = (width - 300) / c;
      var unitY = (height - 150) / r;
      var starPos = createVector(((i + c) % c) * unitX + random(0, unitX - starSize) + 150, ((i + r) % r) * unitY + random(0, unitY - starSize) + 75);
      starPosList.push(starPos);
    }
    for (var j = 0; j < starWords.length; j++) {
      stars.push(new Star(starWords[j], starPosList[j].x, starPosList[j].y, floor(random(0, 3)), starImg[j]));
    }
    starRunOnce++;
    starStarted = true;
  }

  if (starStarted) {
    for (var i = 0; i < starWords.length; i++) {
      stars[i].update();
      stars[i].display();
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

  this.adjStar.style('background', img);
  this.adjStar.style('background-size', '100%');
  this.adjStar.style('outline', 'none');
  this.adjStar.style('font-family', 'monospace');
  this.adjStar.style('font-size', '2em');
  this.adjStar.style('border', 'white');
  this.adjStar.style('color', 'navy');
  this.adjStar.style('border-radius', '20px');

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
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }

  };
}