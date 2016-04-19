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
// 2nd traveller
var eyeSlider;



function setup() {
  over = false;
  socket = io.connect('http://localhost:8080');

  startPage();

}

function draw() {
  sendToServer();
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
}

function frozenTraveller() {
  
}

function empties() {

}

function adjUniverse() {

}

function zone() {

}

function theEnd() {

}

function sendToServer() {
  if (over) {
    socket.emit('toServer', {
      name: name
    });
    console.log("sent to server");
    over = false;
  }

}