var lightRunOnce;
var lightStarted;
var lightQList = []; //textareas
var lightBList = []; //buttons
var lightAreas = [];
var lights = [];
var lightOn;
var lightIndex;
var lightTime;
var lightPos;
var textOut = [];
var limit;
var answers = [];
var areaSize;
var bright;

function setup() {
  createCanvas(windowWidth, windowHeight);
  lightRunOnce = 0;
  lightStarted = false;
  lightOn = false;
  lightIndex = 0;
  lightTime = 0;
  lightPos = createVector(0, 0);
  limit = 12;
  areaSize = height / 3;
  bright = 0;
}

function draw() {
  if (lightRunOnce < 1) {
    background(0);
    for (var i = 0; i < 3; i++) {
      // var area = createImg('img/test.png');
      // area.position(width / 3 * i + width / 6 - areaSize / 2, height / 3 - areaSize / 2);
      // area.size(areaSize, areaSize);
      // area.style('opacity', '0.2');
      // lightAreas.push(area);
      var lightB = createButton('test1');
      lightB.position(width / 3 * i + width / 6, height / 3);
      lightB.id = i;
      lightB.clicked = false;
      lightB.mousePressed(lightClicked);
      //lightB.class('lightButton');
      lightBList.push(lightB);
      var lightIn = createElement('textarea', '');
      lightIn.position(width / 3 * i + width / 6, height / 3 + 20);
      lightQList.push(lightIn);
    }
    for (var i = 0; i < 2; i++) {
      // var area = createImg('img/test.png');
      // area.position(width / 3 * i + 2 * width / 6 - areaSize / 2, 2 * height / 3 - areaSize / 2);
      // area.size(areaSize, areaSize);
      // area.style('opacity', '0.2');
      // lightAreas.push(area);
      var lightB = createButton('test2');
      lightB.position(width / 3 * i + 2 * width / 6, 2 * height / 3);
      lightB.id = i + 3;
      lightB.clicked = false;
      lightB.mousePressed(lightClicked);
      //lightB.class('lightButton');
      lightBList.push(lightB);
      var lightIn = createElement('textarea', '');
      lightIn.position(width / 3 * i + 2 * width / 6, 2 * height / 3 + 20);
      lightQList.push(lightIn);
    }

    lightRunOnce++;
    lightStarted = true;
  }

  if (lightStarted && lightOn) {
    background(bright);
    if (millis() > lightTime + 120) {
      addLight();
      lightTime = millis();
    }
    for (var i = 0; i < lights.length; i++) {
      lights[i].update();
      lights[i].display();
      //console.log(lights.length);
      if (lights.length >= limit) {
        lights[0].photon.remove();
        lights.splice(0, 1);
      }
    }
    
    var clickArray = [lightBList[0].clicked, lightBList[1].clicked, lightBList[2].clicked, lightBList[3].clicked, lightBList[4].clicked];
    var allClicked = clickArray.every(function(item){
      return item;
    });
    console.log(allClicked);
    if (allClicked && bright < 255) {
      bright += 5;
    }

  }
}

function addLight() {
  //textOut = ["pleasing", "complementary", "transparent", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
  if (lights.length < limit && lightPos.x != 0 && lightPos.y != 0) {
    var newLight = new Light(lightPos.x, lightPos.y, textOut[lightIndex]);
    lights.push(newLight);
    lightIndex++;
    if (lightIndex >= textOut.length) {
      lightIndex = 0;
    }
  }
}

function lightClicked() {
  var getText = lightQList[this.id].value();

  if (getText != '') {
    this.class('lightButton');
    this.clicked = true;
    textOut = getText.split(/\W+/);
    answers = answers.concat(textOut);
    for (var i = 0; i < textOut.length; i++) {
      if (textOut[i] == "") {
        textOut.splice(i, 1);
      }
    }
    lightPos.set(this.x, this.y);
    lightOn = true;
  }
}

function Light(posX, posY, word) {
  this.pos = createVector(0, 0);
  this.pos.set(posX, posY);
  this.size = 10;
  this.s = 0;
  this.fontS = 0.5;
  this.photon = createButton(word);
  this.vel = 2;


  this.update = function() {
    this.size = map(this.s, 0, 90, 10, 80);
    this.fontS = map(this.s, 0, 90, 0.5, 4);
    this.pos.y += this.vel;
    this.s++;
  };

  this.display = function() {
    this.photon.size(5 * this.size, this.size);
    this.photon.style('color', 'orange');
    this.photon.style('font-size', this.fontS + 'em');
    this.photon.style('font-family', 'monospace');
    this.photon.style('outline', 'none');
    this.photon.style('background-color', 'Transparent');
    this.photon.style('border', 'white');
    this.photon.position(this.pos.x - 5 * this.size / 2, this.pos.y);

  };
}