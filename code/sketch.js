// user inputs to pass to server
var name;
var hairChoice;


// socket
var socket;


var over;


// gui

// start page
var username;
var startB;
//welcome page
var message;
var nextB;
// 1st traveller
var hairB = [];
var hairMsg;
var tMsg1;
var hairContinueB;
// 2nd traveller
var eyeMsg;
var eyeSlider;
var eyeContinueB;
// empties
var emptiesImg;
var emptiesMsg;
var emptiesD;
var emptiesContinueB;
// adjUniverse
var adjMsg;
var adjContinueB;
// zone
var zoneMsg;
var zoneContinueB;
// the End
var endMsg;
var endB;


function setup() {
  over = false;
  socket = io.connect('http://localhost:8080');

  startPage();

}

function draw() {
}

function startPage() {
  noCanvas();
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
  username.remove();
  startB.remove();
  message = createElement('h1', 'welcome ' + name);
  nextB = createButton('CONTINUE');
  nextB.mousePressed(function() {
    greyHair();
  });

  over = true;
}

// to determine the first character to travel with
function greyHair() {
  message.remove();
  nextB.remove();
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
  var nextTraveller = "run into someone with skin in glowing orange. She is staring at you."
  switch (hairChoice) {
    case 1:
      tMsg1 = createElement('h1', "Kim has grey hair, but he's becoming younger and soon he will have black hair. His curiosity has drvien him to the entrance of this Utopian world. You and Kim " + nextTraveller);
      break;
    case 2:
      tMsg1 = createElement('h1', "Zanzie's hair is turning white. He realizes his movement has become slow. But he will make through the journey. You and Zanzie " + nextTraveller);
      break;
    case 3:
      tMsg1 = createElement('h1', "Sean is 43, but he has been at this age for more than 2000 years. He is bored with his life and an adventure is badly needed. You and Sean " + nextTraveller);
      break;
  }
  hairContinueB = createButton('Continue');
  hairContinueB.mousePressed(frozenTraveller);
}

function frozenTraveller() {
  tMsg1.remove();
  hairContinueB.remove();
  eyeMsg = createElement('h1', "She can freeze time and people and stare at them as long as she wants.");
  eyeSlider = createSlider(0, 100, 20);
  eyeContinueB = createButton('Continue');
  eyeContinueB.mousePressed(empties);
}

function empties() {
  eyeMsg.remove();
  eyeContinueB.remove();
  eyeSlider.remove();
  emptiesMsg = createElement('h1', "This is the Empties. I know it's confusing. It's just hard to describe. You can try describing it.");
  emptiesD = createElement('textarea', "");
  emptiesContinueB = createButton('Continue');
  emptiesContinueB.mousePressed(adjUniverse);
}

function adjUniverse() {
  emptiesMsg.remove();
  emptiesD.remove();
  emptiesContinueB.remove();
  adjMsg = createElement('h1', "Welcome to the Universe of Adjectives");
  adjContinueB = createButton('Continue');
  adjContinueB.mousePressed(zone);
}

function zone() {
  adjMsg.remove();
  adjContinueB.remove();
  zoneMsg = createElement('h1', "THE ZONE");
  zoneContinueB = createButton('Continue');
  zoneContinueB.mousePressed(theEnd);

}

function theEnd() {
  zoneMsg.remove();
  zoneContinueB.remove();
  endMsg = createElement('h1', "This is where you say goodbye to your companions in this journey.");
  endB = createButton('Write your story.');
  endB.mousePressed(sendToServer);

}

function sendToServer() {
  if (over) {
    socket.emit('toServer', {
      name: name,
      hair: hairChoice
    });
    console.log("sent to server");
    over = false;
  }

}