// user inputs to pass to server
var name;
var hairChoice;

// socket
var socket;
var theEnd;

// gui

// start page
var mainTitle;
var username;
var title_name;
var startB;
// welcome page
var welcomeMessage;
var welcomeNextB;
// find other two travellers message
var findMessage;
var findNextB;
// 1st traveller - choice
var hairMsg;
var hairB = []; // hair buttons
// 1st traveller - description + 2nd traveller choice
var hairMsg2;
var hairNextB;
// 2nd traveller - description
var eyeMsg;
var eyeSlider;
var eyeNextB;
// boarding spaceship
var spaceshipStarted = false;
var spaceshipMsg;
var spaceshipImg;
var spaceshipQ;
var spaceshipA;
var spaceshipNextB;
// Galaxy of Emotions
var galaxyStarted = false;
var galaxyMsg;
var galaxyNextB;
// landing - lung/breathing
var landingStarted = false;
var landingImg;
var planetImg;
var landingMove;
var planetMove;
var landingMsg;
var landingNextB;
// breathe 1
var breathStarted = false;
var breathMsg;
var breathNextB;
// breathe 2
var breathStarted2 = false;
var breathMsg2;
var breathNextB2;
// scenery poem
var sceneryStarted = false;
var sceneryMsg;
var sceneryNextB;
// ?
var xNextB;
// ?
var xNextB2;
// streetlamp
var lampStarted = false;
var lampMsg;
var lampNextB;
var road; //background img
// mysterious force
var forceStarted = false;
var forceMsg;
var forceNextB;
// box of stories
var boxStarted = false;
var boxMsg;
var boxImg;
var password; // input
var boxNextB;
// the end
var boxStarted2 = false;
var boxMsg2;
var boxImg2;
var endB;

var backgroudVal;
var fadingVal;
var all; // body element


function setup() {
  createCanvas(windowWidth, windowHeight);
  fadingVal = 0;
  theEnd = false;
  landingMove = height;
  planetMove = -height;
  //socket = io.connect('http://localhost:8080');

  startPage();
  airSetup();
  lungSetup();
  galaxySetup();
  numberSetup();
  lampSetup();

}

function draw() {
  if (forceStarted) {
    numberDraw();
  }
  if (galaxyStarted) {
    galaxyDraw();
  }
  // if (breathStarted) {
  //   airDraw();
  // }
  if (breathStarted2) {
    lungDraw();
  }
  if (lampStarted) {
    lampDraw();
    all.style('background-color', 'rgb(' + backgroundVal + ',' + backgroundVal + ',' + backgroundVal + ')');
  }
  if (landingStarted) {
    landingMove -= 2;
    if (landingMove <= height - height / 1.4) {
      landingMove = height - height / 1.4;
    }
    landingImg.position(width / 4, landingMove);
    planetMove += 1;
    planetImg.position(height / 2, planetMove);
    // if (planetMove >= 0) {
      
    // }
  }
}

function startPage() {
  noCanvas();
  mainTitle = select('#main-title');
  mainTitle.size(width * 0.55, height * 0.3);
  mainTitle.position(width * 0.23, height * 0.25);
  title_name = select('#title-name');
  title_name.position(width * 0.487, height * 0.6);
  username = select('#username');
  username.size(200, 30);
  username.position(width / 2 - 100, height * 0.65);
  startB = createButton('Sign up');
  startB.class('basicButton');
  startB.position(width / 2 - 97, height * 0.72);
  startB.mousePressed(function() {
    name = username.value();
    if (name !== "") {
      welcomePage();
      console.log(name);
    }
  });
}

function welcomePage() {
  mainTitle.remove();
  username.remove();
  title_name.remove();
  startB.remove();
  welcomeMessage = createElement('h1', 'Welcome ' + name + '! Thank you for signing up for the interstellar trip to Datatopia. Datatopia is a planet on the edge of Galaxy of Emotions. You will travel with other two passengers during this trip. They have been to Datatopia before, so they will be your tour guides. You will meet them now.');
  welcomeMessage.class('message-center');
  welcomeNextB = createButton('Next  →');
  welcomeNextB.class('continueButton-day');
  welcomeNextB.mousePressed(function() {
    traveller1();
  });
  theEnd = true;
}

// to determine the first character to travel with
function traveller1() {
  welcomeMessage.remove();
  welcomeNextB.remove();
  hairMsg = createElement('h1', 'has grey hair. How do you know if his hair is turning black or turning white, or staying grey forever?');
  hairMsg.class('message-center');
  hairB[0] = createButton('Black');
  hairB[1] = createButton('White');
  hairB[2] = createButton('Staying grey');
  for (i in hairB) {
    hairB[i].class('hairButton');
  }
  hairB[0].style('color', 'white');
  hairB[0].style('background-color', 'black');
  hairB[1].style('color', 'black');
  hairB[1].style('background-color', '#E4E4E4');
  hairB[2].style('color', 'white');
  hairB[2].style('background-color', 'grey');
  hairB[0].position(0.25 * width - 100, height * 0.6);
  hairB[1].position(0.5 * width - 100, height * 0.6);
  hairB[2].position(0.75 * width - 100, height * 0.6);

  hairB[0].mousePressed(function() {
    console.log('black');
    hairChoice = 1;
    traveller1_2();
  });
  hairB[1].mousePressed(function() {
    console.log('white');
    hairChoice = 2;
    traveller1_2();
  });
  hairB[2].mousePressed(function() {
    console.log('grey');
    hairChoice = 3;
    traveller1_2();
  });
}

function traveller1_2() {
  hairMsg.remove();
  for (var i = 0; i < hairB.length; i++) {
    hairB[i].remove();
  }
  var nextTraveller = "run into someone with eyes in glowing orange. She is staring at you.";
  switch (hairChoice) {
    case 1:
      hairMsg2 = createElement('h1', "has grey hair, but he's becoming younger and soon his hair will become black. His curiosity has drvien him to travel around several planets in Galaxy of Emotions. You and" + nextTraveller);
      break;
    case 2:
      hairMsg2 = createElement('h1', "'s hair is turning white. He realizes his movement has become slow. But he will make through the journey. You and" + nextTraveller);
      break;
    case 3:
      hairMsg2 = createElement('h1', "is 43 years old, but he has been at this age for more than 2000 years. He is bored with his life and an adventure is badly needed for him. You and" + nextTraveller);
      break;
  }
  hairMsg2.class('message-center');
  hairNextB = createButton('Next  →');
  hairNextB.class('continueButton-day');
  hairNextB.mousePressed(traveller2);
}

function traveller2() {
  console.log("traveller2");
  hairMsg2.remove();
  hairNextB.remove();
  eyeMsg = createElement('h1', 'Her name is' + '. She can freeze time and people and stare at them as long as she wants.');
  eyeMsg.class('message-center');
  eyeSlider = createSlider(0, 100, 20);
  eyeNextB = createButton('Next  →');
  eyeNextB.class('continueButton-day');
  eyeNextB.mousePressed(boarding);
}

function boarding() {
  console.log("boarding");
  eyeMsg.remove();
  eyeSlider.remove();
  eyeNextB.remove();
  spaceshipMsg = createElement('h1', "Welcome on board");
  spaceshipMsg.class('message-top');
  spaceshipImg = createImg('img/spaceship.jpg');
  spaceshipImg.size(width * 0.5, width * 0.5 * 0.86);
  spaceshipImg.position(width * 0.4, height * 0.15);
  spaceshipQ = createElement('h2', 'Boarding pass: what is your favorite fruit?');
  spaceshipQ.style('color', '#B3B3B3');
  spaceshipQ.position(0.1 * width, 0.2 * height);
  spaceshipA = createElement('textarea', '');
  spaceshipA.class('basic-input');
  spaceshipA.size(width/6, height/10);
  spaceshipA.position(0.1 * width, 0.3 * height);
  spaceshipNextB = createButton("Take off now");
  spaceshipNextB.class('continueButton-day');
  spaceshipNextB.mousePressed(galaxyOfEmotions);
}

function galaxyOfEmotions() {
  console.log("galaxy of emotions");
  spaceshipMsg.remove();
  spaceshipNextB.remove();
  spaceshipImg.remove();
  spaceshipQ.remove();
  spaceshipA.remove();
  spaceshipNextB.remove();
  galaxyMsg = createElement('h1', "Welcome to the Universe of Adjectives");
  galaxyMsg.class('message');
  galaxyStarted = true;
  // if (landingReady) {
  //   galaxyNextB = createButton('Next');
  //   galaxyNextB.class('continueButton');
  //   galaxyNextB.mousePressed(landing);
  // }
}

function landing() {
  console.log("landing");
  galaxyMsg.remove();
  galaxyNextB.remove();
  landingMsg = createElement('h1', "We are landing on Datatopia");
  landingImg = createImg('img/spaceship-above.png');
  landingImg.position(width / 4, landingMove);
  landingImg.size(width / 2, height / 1.4);
  planetImg = createImg('img/spaceship-above.png');
  planetImg.position(width / 2, landingMove);
  planetImg.size(width / 2, height / 1.4);
  landingMsg.class('message');
  landingNextB = createButton('next');
  landingNextB.class('continueButton-day');
  landingNextB.mousePressed(scenery);

  galaxyStarted = false;
  spaceship.remove();
  for (var i = 0; i < stars.length; i++) {
    stars[i].adjStar.remove();
  }

  landingStarted = true;
}

function scenery() {
  console.log("scenery");
  all = select('body');
  backgroundVal = 0;
  all.style('background-color', 'rgb(' + backgroundVal + ',' + backgroundVal + ',' + backgroundVal + ')');

  landingStarted = false;

  landingImg.remove();
  landingMsg.remove();
  landingNextB.remove();

  sceneryMsg = createElement('h1', "scenery poems");
  sceneryMsg.class('message');
  sceneryNextB = createButton('next');
  sceneryNextB.class('continueButton-night');
  sceneryNextB.mousePressed(breathe1);
}

function breathe1() {
  console.log("breathe1");
  sceneryMsg.remove();
  sceneryNextB.remove();
  breathMsg = createElement('h1', "breathe1");
  breathMsg.class('message');
  breathNextB = createButton('next');
  breathNextB.class('continueButton-night');
  breathNextB.mousePressed(breathe2);

  breathStarted = true;
}

function breathe2() {
  console.log("breathe2");
  breathStarted = false;
  breathMsg.remove();
  breathNextB.remove();
  breathMsg2 = createElement('h1', "breathe2");
  breathMsg2.class('message');
  breathNextB2 = createButton('next');
  breathNextB2.class('continueButton-night');
  breathNextB2.mousePressed(x);

  breathStarted2 = true;
}



function x() {
  console.log("x");
  breathStarted2 = false;
  lungImg.remove();
  for (var i = 0; i < airList.length; i++) {
    airList[i].air.remove();
  }
  breathMsg2.remove();
  breathNextB2.remove();

  //sceneryMsg2 = createElement('h1', "We are landing on Datatopia");
  //sceneryMsg2.class('message');
  xNextB = createButton('next');
  xNextB.class('continueButton-night');
  xNextB.mousePressed(x2);

}

function x2() {
  console.log("x2");
  //Msg2.remove();
  xNextB.remove();
  //sceneryMsg2 = createElement('h1', "We are landing on Datatopia");
  //sceneryMsg2.class('message');
  xNextB2 = createButton('next');
  xNextB2.class('continueButton-night');
  xNextB2.mousePressed(streetLamp);
}

function streetLamp() {
  console.log("street lamp");
  //sceneryMsg.remove();
  xNextB2.remove();
  lampStarted = true;

  road = createImg('img/road.png');
  road.position(0, 0);
  road.size(width, height);
  lampMsg = createElement('h1', "street lamp");
  lampMsg.class('message');
}

function force() {
  console.log("force");
  lampMsg.remove();
  lampNextB.remove();

  //lampStarted = false;
  for (var i = 0; i < lights.length; i++) {
    lights[i].photon.remove();
    lights.splice(0, i);

    lightQList[i].remove();
    lightBList[i].remove();
    lightBList2[i].remove();
    lightArea[i].remove();
    questionsP[i].remove();
  }
  road.remove();
  endRoad.remove();
  lampStarted = false;

  forceMsg = createElement('h1', "The force");
  forceMsg.class('message');



  forceStarted = true;
  console.log(lights);
}

function storyBox() {
  for (var i = 0; i < lights.length; i++) {
    lights[i].photon.remove();
  }
  forceMsg.remove();
  forceNextB.remove();
  boxMsg = createElement('h1', "The box");
  boxMsg.class('message-top');
  boxImg = createImg('img/box.png');
  boxImg.size(0.6*width, 0.5*width);
  boxImg.position(0.2*width, 0.2*height);
  boxNextB = createButton('end');

  forceStarted = false;
  pitImg.remove();
  for (var i = 0; i < rocks.length; i++) {
    rocks[i].wordRock.remove();
  }
}

function finalEnd() {
  boxMsg.remove();
  boxNextB.remove();
  endMsg = createElement('h1', "This is where you say goodbye to your companions in this journey.");
  endMsg.class('message');
  endB = createButton('Write your story.');
  endB.class('continueButton-day');

  //endB.mousePressed(sendToServer);

}

function sendToServer() {
  if (theEnd) {
    socket.emit('toServer', {
      name: name,
      hair: hairChoice
    });
    console.log("sent to server");
    theEnd = false;
  }

}

// function transition() {
//   var fade = createDiv('');
//   fade.size(windowWidth, windowHeight);
//   fade.position(0, 0);
//   fadingVal += 5;
//   var faded = false;
//   if (fadingVal >= 255) {
//     fadingVal -= 5;
//     faded = true;
//   }
//   if (faded && fadingVal <= 0) {
//     fade.remove();
//   }
//   fade.style('background-color', 'rgba(' + 255 + ',' + 255 + ',' + 255 + ',' + fadingVal + ')');

// }