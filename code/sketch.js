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

// // the End
// var endMsg;
// var endB;


function setup() {
  createCanvas(windowWidth, windowHeight);

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
  }
  if (landingStarted) {
    landingMove -= 2;
    if (landingMove <= height - height / 1.4) {
      landingMove = height - height / 1.4;
    }
    landingImg.position(width / 4, landingMove);
    planetMove += 1;
    planetImg.position(height / 2, planetMove);
  }
}

function startPage() {
  noCanvas();
  mainTitle = select('#main-title');
  mainTitle.size(width * 0.55, height * 0.3);
  mainTitle.position(width*0.23, height* 0.25);
  title_name = select('#title-name');
  title_name.position(width * 0.487, height * 0.6);
  username = select('#username');
  username.size(200, 30);
  username.position(width / 2 - 100, height * 0.65);
  //startB = select('#startButton');
  startB = createButton('Sign up');
  startB.class('continueButton');
  //startB.size(80, 40);
  startB.position(width/2 - 40, height * 0.75);
  //startB.class('startButton');
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
  welcomeMessage = createElement('h1', 'welcome ' + name);
  welcomeMessage.class('message');
  welcomeNextB = createButton('Next');
  welcomeNextB.class('continueButton');
  welcomeNextB.mousePressed(function() {
    traveller1();
  });

  theEnd = true;
}

// to determine the first character to travel with
function traveller1() {
  welcomeMessage.remove();
  welcomeNextB.remove();
  hairMsg = createElement('h1', 'When you see someone with grey hair, how do you know if his/her hair is turning black or turning white, or staying grey forever?');
  hairMsg.class('message');
  hairB[0] = createButton('Black');
  hairB[1] = createButton('White');
  hairB[2] = createButton('Staying grey');
  for (i in hairB) {
    hairB[i].class('continueButton');
  }

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
  var nextTraveller = "run into someone with skin in glowing orange. She is staring at you.";
  switch (hairChoice) {
    case 1:
      hairMsg2 = createElement('h1', "Kim has grey hair, but he's becoming younger and soon he will have black hair. His curiosity has drvien him to the entrance of this Utopian world. You and Kim " + nextTraveller);
      break;
    case 2:
      hairMsg2 = createElement('h1', "Zanzie's hair is turning white. He realizes his movement has become slow. But he will make through the journey. You and Zanzie " + nextTraveller);
      break;
    case 3:
      hairMsg2 = createElement('h1', "Sean is 43, but he has been at this age for more than 2000 years. He is bored with his life and an adventure is badly needed. You and Sean " + nextTraveller);
      break;
  }
  hairMsg2.class('message');
  hairNextB = createButton('Next');
  hairNextB.class('continueButton');
  hairNextB.mousePressed(traveller2);
}

function traveller2() {
  console.log("traveller2");
  hairMsg2.remove();
  hairNextB.remove();
  eyeMsg = createElement('h1', "She can freeze time and people and stare at them as long as she wants.");
  eyeMsg.class('message');
  eyeSlider = createSlider(0, 100, 20);
  eyeNextB = createButton('Next');
  eyeNextB.class('continueButton');
  eyeNextB.mousePressed(boarding);
}

function boarding() {
  console.log("boarding");
  eyeMsg.remove();
  eyeSlider.remove();
  eyeNextB.remove();
  spaceshipMsg = createElement('h1', "Welcome to board");
  spaceshipMsg.class('message');
  spaceshipImg = createImg('img/spaceship.png');
  spaceshipQ = createElement('h2', "Boarding-pass question: what's your favorite fruit?");
  spaceshipA = createElement('textarea', '');
  spaceshipNextB = createButton("Take off now");
  spaceshipNextB.class('continueButton');
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
  landingNextB.class('continueButton');
  landingNextB.mousePressed(breathe1);

  galaxyStarted = false;
  spaceship.remove();
  for (var i = 0; i < stars.length; i++) {
    stars[i].adjStar.remove();
  }

  landingStarted = true;
}

function breathe1() {
  console.log("breathe1");
  landingStarted = false;

  landingImg.remove();
  landingMsg.remove();
  landingNextB.remove();
  breathMsg = createElement('h1', "breathe1");
  breathMsg.class('message');
  breathNextB = createButton('next');
  breathNextB.class('continueButton');
  breathNextB.mousePressed(breathe2);

  breathStarted = true;
}

function breathe2() {
  console.log("breathe2");
  breathMsg.remove();
  breathNextB.remove();
  breathMsg2 = createElement('h1', "breathe2");
  breathMsg2.class('message');
  breathNextB2 = createButton('next');
  breathNextB2.class('continueButton');
  breathNextB2.mousePressed(scenery);

  breathStarted2 = true;
}

function scenery() {
  console.log("scenery");
  lungImg.remove();
  for (var i = 0; i < airList.length; i++) {
    airList[i].air.remove();
  }
  breathMsg2.remove();
  breathNextB2.remove();
  sceneryMsg2 = createElement('h1', "scenery poems");
  sceneryMsg2.class('message');
  sceneryNextB2 = createButton('next');
  sceneryNextB2.class('continueButton');
  sceneryNextB2.mousePressed(x);
}

function x() {
  console.log("x");
  sceneryMsg2.remove();
  sceneryNextB2.remove();
  //sceneryMsg2 = createElement('h1', "We are landing on Datatopia");
  //sceneryMsg2.class('message');
  xNextB = createButton('next');
  xNextB.class('continueButton');
  xNextB.mousePressed(x2);

}

function x2() {
  console.log("x2");
  //Msg2.remove();
  xNextB.remove();
  //sceneryMsg2 = createElement('h1', "We are landing on Datatopia");
  //sceneryMsg2.class('message');
  xNextB2 = createButton('next');
  xNextB2.class('continueButton');
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
  lampNextB = createButton('go to mysterious force');
  lampNextB.position(300, 0);
  lampNextB.class('continueButton');
  lampNextB.mousePressed(force);
}

function force() {
  console.log("force");
  lampMsg.remove();
  lampNextB.remove();

  //lampStarted = false;
  for (var i = 0; i < lights.length; i++) {
    //limit = 1;
    lights[i].photon.remove();
    lights.splice(0, i);

    // if (lights.length == 0) {
    //   console.log(lights.length);
    //}
    lightQList[i].remove();
    lightBList[i].remove();
    lightBList2[i].remove();
    lightArea[i].remove();
    questionsP[i].remove();
  }
  road.remove();
  endRoad.remove();
  lampStarted = false;
  // var whiteBackground = createImg('img/planet2.png');
  // whiteBackground.position(0, 0);
  // whiteBackground.size(windowWidth, windowHeight);

  forceMsg = createElement('h1', "The force");
  forceMsg.class('message');
  forceNextB = createButton('Go to the box');
  forceNextB.class('continueButton');
  forceNextB.mousePressed(storyBox);

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
  boxMsg.class('message');
  boxImg = createImg('img/planet1.png');
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
  endB.class('continueButton');

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