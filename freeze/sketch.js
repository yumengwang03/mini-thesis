var lightRunOnce;
var lightStarted;
var lightQList = []; //textareas
var lightBList = []; //buttons
var lights = [];
//var lightOn;
var lightIndex;
var lightOrder;
var lightTime;
var lightPos;
var textOut = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  lightRunOnce = 0;
  lightStarted = false;
  lightOn = false;
  lightIndex = 0;
  lightOrder = 0;
  lightTime = 0;
  lightPos = createVector(0, 0);
}

function draw() {
  if (lightRunOnce < 1) {
    for (var i = 0; i < 3; i++) {
      var lightB = createButton('test1');
      lightB.position(width / 3 * i + width / 6, height / 3);
      lightB.id = i;
      lightB.mousePressed(lightClicked);
      lightBList.push(lightB);
      var lightIn = createElement('textarea', 'hey' + i);
      lightIn.position(width / 3 * i + width / 6, height / 3 + 20);
      lightQList.push(lightIn);
    }
    for (var i = 0; i < 2; i++) {
      var lightB = createButton('test2');
      lightB.position(width / 3 * i + 2 * width / 6, 2 * height / 3);
      lightB.id = i + 3;
      lightB.mousePressed(lightClicked);
      lightBList.push(lightB);
      var lightIn = createElement('textarea', 'hey' + (i + 3));
      lightIn.position(width / 3 * i + 2 * width / 6, 2 * height / 3 + 20);
      lightQList.push(lightIn);
    }

    lightRunOnce++;
    lightStarted = true;
  }
  if (lightStarted) {
    if (lightOn) {
      if (millis() > lightTime + 120) {
        addLight();
        lightTime = millis();
      }

      for (var i = 0; i < lights.length; i++) {
        lights[i].update();
        lights[i].display();
        //console.log(lights.length);

        if (lights.length >= textOut.length) {
          lights[0].photon.remove();
          lights.splice(0, 1);

        }
      }
    }

  }

}

function addLight() {
  //textOut = ["pleasing", "complementary", "transparent", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
  console.log(textOut);
  if (textOut.length < 10) {
    textOut.push(textOut[lightOrder]);
    lightOrder++;
  }
  if (textOut.length >= 10 && lights.length < textOut.length && lightPos.x != 0 && lightPos.y != 0) {
    var newLight = new Light(lightPos.x, lightPos.y, textOut[lightIndex]);
    lights.push(newLight);
    lightIndex++;
    if (lightIndex >= textOut.length) {
      lightIndex = 0;
    }
  }
}

function lightClicked() {
  lightPos.set(this.x, this.y);
  lightOn = true;
  var getText = lightQList[this.id].value();
  textOut = getText.split(/\W+/);
  for (var i = 0; i < textOut.length; i++) {
    if(textOut[i] == "") {
      textOut.splice(i, 1);
    }
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
    this.size = map(this.s, 0, 90, 10, 40);
    this.fontS = map(this.s, 0, 90, 0.5, 2);
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