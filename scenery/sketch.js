// reference: noise wave https://p5js.org/examples/examples/Math_Noise_Wave.php
var sceneryRunOnce;
var poemStarted;
var skyLine;
var mountainLine;
var forestLine;
var waterList = [];
var waterWords = [];
var waterPos = [];
var yoff = 0.0;
//var water;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noCanvas();
  sceneryRunOnce = 0;
  poemStarted = false;
  skyLine = height / 4;
  mountainLine = height / 2.4;
  forestLine = 3 * height / 4;
  waterWords = ["bottle", "blue", "melancholy", "destruction", "willingness", "spoken", "iridescent"];
}

function draw() {
  background(255);
  if (sceneryRunOnce < 1) {
    // line(0, skyLine, width, skyLine);
    // line(0, mountainLine, width, mountainLine);
    // line(0, forestLine, width, forestLine);

    // for (var i = 0; i < 100; i++) {
    //   var water = new Water(waterWords[floor(random(0, waterWords.length))]);
    //   waterList[i].push(water);
    // }

    for (var i = 0; i < windowWidth / 100; i++) {
      var water = createP(waterWords[floor(random(0, waterWords.length))]);
      waterList.push(water);
      //console.log(water);
      waterPos[i] = createVector(0, 0);
    }
    //water = createP(waterWords[0]);

    sceneryRunOnce++;
    poemStarted = true;
  }

  if (poemStarted) {
    // for (var i = 0; i < waterList.length; i++) {
    //   waterList[i].display();
    //   waterList[i].update();
    // }

    var xoff = 0;
    for (var x = 0; x < waterList.length; x++) {
      var y = map(noise(xoff, yoff), 0, 1, 200, 300);
      stroke(0);
      line(100 * x, y, 100 * x + 5, y);
      //line(x, y + 20, x + 5, y + 20);
      //waterList[9].position(x, y);
      // waterPos.push(y);
      waterPos[x].x = 100 * x;
      waterPos[x].y = y;

      //for (var i = 0; i < waterList.length; i++) {
      //waterList[x].position(x, y);
      //console.log(x);
      //}

      xoff += 0.05;
    }
    yoff += 0.01;
    //console.log(waterPos);
    for (var m = 0; m < waterList.length; m++) {
      waterList[m].position(waterPos[m].x, waterPos[m].y);
    }
    
  }
}

function Water(word) {
  this.poemPos = createVector(0, 0);
  // this.poemPos.set(xPos, yPos);
  this.word = word;
  this.water = createP(this.word);

  this.display = function() {

  }

  this.update = function() {

  }
}