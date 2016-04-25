var lightRunOnce;
var lightStarted;
var lightQList = []; //textareas
var lightBList = []; //buttons
var lightBList2 = []; //real buttons
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
    var road = createImg('img/road.png');
    road.position(0, 0);
    road.size(width, height);
    var endRoad = createElement('h1', 'Mysterious force is at the end of the road');
    endRoad.position(width / 2 - 300, height / 2);
    for (var i = 0; i < 3; i++) {
      var lightB2 = createButton('off');
      lightB2.position(width / 3 * i + width / 6.2, height / 3 - areaSize / 2.8);
      lightBList2.push(lightB2);

      var area = createImg('img/lampPost2.png');
      area.position(width / 3 * i + width / 6 - areaSize / 3, height / 3 - areaSize / 1.6);
      area.size(areaSize / 2.5, areaSize);

      var lightB = createButton('off');
      lightB.position(width / 3 * i + width / 6.5, height / 3 - areaSize / 2.2);
      lightB.id = i;
      lightB.clicked = false;
      lightB.mousePressed(lightClicked);
      // //lightB.class('lampLight');
      lightBList.push(lightB);

      var lightIn = createElement('textarea', '');
      lightIn.position(width / 3 * i + width / 6, height / 3 + 20);
      lightQList.push(lightIn);
    }
    for (var i = 0; i < 2; i++) {
      var lightB2 = createButton('off');
      lightB2.position(width / 3 * i + 2 * width / 6.1, 2 * height / 3 - areaSize / 6.8);
      lightBList2.push(lightB2);

      var area = createImg('img/lampPost2.png');
      area.position(width / 3 * i + 2 * width / 6 - areaSize / 3, 2 * height / 3 - areaSize / 2.6);
      area.size(areaSize / 2.5, areaSize);

      var lightB = createButton('off');
      lightB.position(width / 3 * i + 2 * width / 6.25, 2 * height / 3 - areaSize / 4.7);
      lightB.id = i + 3;
      lightB.clicked = false;
      lightB.mousePressed(lightClicked);
      //lightB.class('lampLight');
      lightBList.push(lightB);

      var lightIn = createElement('textarea', '');
      lightIn.position(width / 3 * i + 2 * width / 6, 2 * height / 3 + 20);
      lightQList.push(lightIn);
    }

    lightRunOnce++;
    lightStarted = true;

    for (var m = 0; m < lightBList.length; m++) {
      lightBList[m].size(areaSize / 8, areaSize / 8);
      lightBList[m].style('background', 'transparent');
      lightBList[m].style('background-size', '100%');
      lightBList[m].style('outline', 'none');
      lightBList[m].style('font-family', 'monospace');
      lightBList[m].style('font-size', areaSize / 220 + 'em');
      lightBList[m].style('border', 'white');
      lightBList[m].style('color', 'white');
      lightBList[m].style('border-radius', '15px');

      lightBList2[m].size(2, 2);
      lightBList2[m].style('background', 'transparent');
      lightBList2[m].style('outline', 'none');
      lightBList2[m].style('border', 'white');
      lightBList2[m].style('color', 'white');
    }
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
    var allClicked = clickArray.every(function(item) {
      return item;
    });
    //console.log(allClicked);
    if (allClicked && bright < 255) {
      bright += 1.5;
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
    //this.style('background', '#f2bf27');

    //this.class('lightButton');

    lightBList2[this.id].class('lightButton');
    this.clicked = true;
    textOut = getText.split(/\W+/);
    answers = answers.concat(textOut);
    for (var i = 0; i < textOut.length; i++) {
      if (textOut[i] == "") {
        textOut.splice(i, 1);
      }
    }
    lightPos.set(this.x + areaSize / 16, this.y + areaSize / 12);
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
  this.opacity = 1;

  this.update = function() {
    this.size = map(this.s, 0, 90, 10, 80);
    this.fontS = map(this.s, 0, 90, 0.5, 4);
    this.opacity = map(this.s, 0, 60, 1, 0.4);
    this.pos.y += this.vel;
    this.s++;
  };

  this.display = function() {
    this.photon.size(5 * this.size, this.size);
    this.photon.style('color', 'rgba(255,191,0,' + this.opacity + ')');
    this.photon.style('font-size', this.fontS + 'em');
    this.photon.style('font-family', 'monospace');
    this.photon.style('outline', 'none');
    this.photon.style('background-color', 'Transparent');
    this.photon.style('border', 'white');
    this.photon.position(this.pos.x - 5 * this.size / 2, this.pos.y);

  };
}