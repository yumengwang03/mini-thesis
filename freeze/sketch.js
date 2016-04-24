var lightRunOnce;
var lightStarted;
var lightQList = []; //textareas
var lightBList = []; //buttons
var lights = [];
//var lightOn;
var lightIndex;
var lightTime;
var lightPos;

function setup() {
  createCanvas(windowWidth, windowHeight);
  lightRunOnce = 0;
  lightStarted = false;
  lightOn = false;
  lightIndex = 0;
  lightTime = 0;
  lightPos = createVector(0, 0);
}

function draw() {
  if (lightRunOnce < 1) {
    for (var i = 0; i < 3; i++) {
      var lightB = createButton('test1');
      lightB.position(width / 3 * i + width / 6, height / 3);
      lightB.mousePressed(lightClicked);
      lightBList.push(lightB);
      var lightIn = createElement('textarea', 'hey1');
      lightIn.position(width / 3 * i + width / 6, height / 3 + 20);
      lightQList.push(lightIn);
    }
    for (var i = 0; i < 2; i++) {
      var lightB = createButton('test2');
      lightB.position(width / 3 * i + 2 * width / 6, 2 * height / 3);
      lightB.mousePressed(lightClicked);
      lightBList.push(lightB);
      var lightIn = createElement('textarea', 'hey2');
      lightIn.position(width / 3 * i + 2 * width / 6, 2 * height / 3 + 20);
      lightQList.push(lightIn);
    }

    lightRunOnce++;
    lightStarted = true;
  }
  if (lightStarted) {
    if (lightOn) {
      if (millis() > lightTime + 100) {
        addLight();
        lightTime = millis();
      }

      for (var i = 0; i < lights.length; i++) {
        lights[i].update();
        lights[i].display();
        //console.log(lights.length);

        if (lights.length > 10) {
          lights[0].photon.remove();
          lights.splice(0, 1);

        }
      }
    }

  }

}

function addLight() {
  var textOut = ["pleasing", "complementary", "transparent", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
  if (lights.length <= 10 && lightPos.x != 0 && lightPos.y != 0) {
    var newLight = new Light(lightPos.x, lightPos.y, textOut[lightIndex]);
    lights.push(newLight);
    lightIndex++;
    if (lightIndex > textOut.length) {
      lightIndex = 0;
    }
  }
}

function lightClicked() {
  //console.log(this.x, this.y);
  lightPos.set(this.x, this.y);
  lightOn = true;
}

function Light(posX, posY, word) {
  this.pos = createVector(0, 0);
  this.pos.set(posX, posY);
  //this.size = 
  this.photon = createP(word);
  this.vel = 2;

  this.update = function() {
    this.pos.y += this.vel;

  };

  this.display = function() {
    this.photon.style('font-family', 'Avenir');
    this.photon.style('font-weight', 'bold');
    this.photon.position(this.pos.x, this.pos.y);

  };
}