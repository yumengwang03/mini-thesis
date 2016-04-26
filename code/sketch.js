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
var breathStarted = false;
var breathMsg;
var breathNextB;
// fresh air message
var breathMsg2;
var breathNextB2;
// scenery poem message
var sceneryMsg;
var sceneryNextB;
// scenery poem
var sceneryStarted = false;
var sceneryMsg2;
var sceneryNextB2;
// ?
var xNextB;
// ?
var xNextB2;
// streetlamp
var lampStarted = false;
var lampMsg;
var lampNextB;
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

// // empties
// var emptiesImg;
// var emptiesMsg;
// var emptiesD;
// var emptiesNextB;
// // adjUniverse
// var adjMsg;
// var adjNextB;
// // force

// // the End
// var endMsg;
// var endB;


function setup() {
  createCanvas(windowWidth, windowHeight);
  theEnd = false;
  //socket = io.connect('http://localhost:8080');

  startPage();

  numberSetup();

}

function draw() {
  //console.log(forceStarted);
  if (forceStarted) {
    numberDraw();
  }
}

function startPage() {
  noCanvas();
  mainTitle = select('#main-title');
  username = select('#username');
  startB = select('#startButton');
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
  startB.remove();
  welcomeMessage = createElement('h1', 'welcome ' + name);
  welcomeNextB = createButton('Next');
  welcomeNextB.mousePressed(function() {
    greyHair();
  });

  theEnd = true;
}

// to determine the first character to travel with
function greyHair() {
  welcomeMessage.remove();
  welcomeNextB.remove();
  hairMsg = createElement('h1', 'When you see someone with grey hair, how do you know if his/her hair is turning black or turning white, or staying grey forever?');
  hairB[0] = createButton('Black');
  hairB[1] = createButton('White');
  hairB[2] = createButton('Staying grey');

  hairB[0].mousePressed(function() {
    console.log('black');
    hairChoice = 1;
    greyHair2();
  });
  hairB[1].mousePressed(function() {
    console.log('white');
    hairChoice = 2;
    greyHair2();
  });
  hairB[2].mousePressed(function() {
    console.log('grey');
    hairChoice = 3;
    greyHair2();
  });
}

function greyHair2() {
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
  hairNextB = createButton('Next');
  hairNextB.mousePressed(frozenTraveller);
}

function frozenTraveller() {
  hairMsg2.remove();
  hairNextB.remove();
  eyeMsg = createElement('h1', "She can freeze time and people and stare at them as long as she wants.");
  eyeSlider = createSlider(0, 100, 20);
  eyeNextB = createButton('Next');
  eyeNextB.mousePressed(empties);
}

function empties() {
  eyeMsg.remove();
  eyeNextB.remove();
  eyeSlider.remove();
  emptiesMsg = createElement('h1', "This is the Empties. I know it's confusing. It's just hard to describe. You can try describing it.");
  emptiesD = createElement('textarea', "");
  emptiesNextB = createButton('Next');
  emptiesNextB.mousePressed(adjUniverse);
}

function adjUniverse() {
  emptiesMsg.remove();
  emptiesD.remove();
  emptiesNextB.remove();
  adjMsg = createElement('h1', "Welcome to the Universe of Adjectives");
  adjNextB = createButton('Next');
  adjNextB.mousePressed(force);
}

function force() {
  adjMsg.remove();
  adjNextB.remove();
  forceMsg = createElement('h1', "THE force");
  forceNextB = createButton('Next');
  forceNextB.mousePressed(finalEnd);

  forceStarted = true;
}

function finalEnd() {
  forceMsg.remove();
  forceNextB.remove();
  endMsg = createElement('h1', "This is where you say goodbye to your companions in this journey.");
  endB = createButton('Write your story.');

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