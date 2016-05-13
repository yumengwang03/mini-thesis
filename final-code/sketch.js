// user inputs to pass to server
var name;
var hairChoice;
var spaceshipAnswer;
var emotions = [];
var lampAnswers = [];

var allData = [];

// socket
var socket;
var theEnd;

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
// var eyeSlider;
var eyeNextB;
// boarding spaceship
var boardingStarted = false;
var spaceshipMsg;
var spaceshipImg;
var spaceshipQ;
var spaceshipA;
var spaceshipNextB;
// var boardingSpeed;
// var boardingPos;
// Galaxy of Emotions
var galaxyStarted = false;
var galaxyMsg;
var galaxyNextB;
// landing
var landingStarted = false;
var landingImg;
var planetImg;
var landingMove;
var planetMove;
var planetSpeed;
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
var boxPass; // input
var boxNextB;
// the end
var boxStarted2 = false;
var boxImg2;
var endMsg;
var endB;

var backgroudVal;
var fadingVal;
var all; // body element

// past travellers
var passenger1;
var passenger2;

var nameEntered = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    fadingVal = 0;
    boardingSpeed = 2;
    boardingPos = height * 0.15;
    theEnd = false;
    landingMove = height;
    planetMove = -height / 1.4;
    planetSpeed = 1;
    socket = io.connect('http://localhost:8080');

    startPage();
    scenerySetup();
    airSetup();
    lungSetup();
    galaxySetup();
    numberSetup();
    lampSetup();

    socket.on('toClient',
        function(data) {
            //console.log(data);
            passenger1 = data.traveller1;
            passenger2 = data.traveller2;
        });

}

function draw() {
    if (forceStarted) {
        numberDraw();
    }
    // if (boardingStarted) {
    //   boardingPos += boardingSpeed;
    //   if (boardingPos >= height - width * 0.5 * 0.86 || boardingPos <= 0.15 * height) {
    //     boardingSpeed *= -1;
    //   }
    // }
    if (galaxyStarted) {
        galaxyDraw();
    }
    if (sceneryStarted) {
        sceneryDraw();
    }
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
            planetSpeed = 0;
        }
        landingImg.position(width / 4, landingMove);
        planetMove += planetSpeed;
        planetImg.position(width * 0.125, planetMove);
        if (planetMove >= 0) {
            planetMove = 0;
        }
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
    username.style('overflow', 'hidden');
    startB = createButton('Sign up');
    startB.class('basic-Button');
    startB.position(width / 2 - 97, height * 0.72);
    startB.mousePressed(function() {
        name = username.value();
        if (name !== "") {
            welcomePage();
            console.log(name);
            nameEntered = true;
        }
    });
}

function keyPressed() {
    if (keyCode == 13 && !nameEntered) {
        name = username.value();
        if (name !== "") {
            welcomePage();
            console.log(name);
            nameEntered = true;
        }
    }
}

function welcomePage() {
    mainTitle.remove();
    username.remove();
    title_name.remove();
    startB.remove();
    welcomeMessage = createElement('h1', 'Welcome ' + name + '! Thank you for signing up for the interstellar trip to Datatopia. Datatopia is a planet on the edge of the Galaxy of Emotions. You will travel with other two passengers during this trip. They have been to Datatopia before, so they will be your tour guides. You will meet them shortly.');
    welcomeMessage.class('message-center');
    welcomeNextB = createButton('Next  →');
    welcomeNextB.class('continueButton-day');
    welcomeNextB.mousePressed(function() {
        traveller1();
    });
}

// to determine the first character to travel with
function traveller1() {
    welcomeMessage.remove();
    welcomeNextB.remove();
    hairMsg = createElement('h1', passenger1 + ' has grey hair. How do you know if his hair is turning black or turning white, or staying grey forever?');
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
            hairMsg2 = createElement('h1', passenger1 + " has grey hair, but he's becoming younger and soon his hair will become black. His curiosity has drvien him to travel around several planets in Galaxy of Emotions. You and " + passenger1 + " " + nextTraveller);
            break;
        case 2:
            hairMsg2 = createElement('h1', passenger1 + "'s hair is turning white. He realizes his movement has become slow. But he will make through the journey. You and " + passenger1 + " " + nextTraveller);
            break;
        case 3:
            hairMsg2 = createElement('h1', passenger1 + " is 43 years old, but he has been at this age for more than 2000 years. He is bored with his life and an adventure is badly needed for him. You and " + passenger1 + " " + nextTraveller);
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
    eyeMsg = createElement('h1', 'Her name is ' + passenger2 + '. She can freeze time and people and stare at them as long as she wants.');
    eyeMsg.class('message-center');
    //eyeSlider = createSlider(0, 100, 20);
    eyeNextB = createButton('Next  →');
    eyeNextB.class('continueButton-day');
    eyeNextB.mousePressed(boarding);
}

function boarding() {
    console.log("boarding");
    eyeMsg.remove();
    //eyeSlider.remove();
    eyeNextB.remove();
    spaceshipMsg = createElement('h1', 'We are ready now. Welcome on board, ' + name + ', ' + passenger1 + ' and ' + passenger2 + '!');
    spaceshipMsg.class('message-top');
    spaceshipImg = createImg('img/spaceship.jpg');
    spaceshipImg.size(width * 0.5, width * 0.5 * 0.86);
    spaceshipImg.position(width * 0.4, boardingPos);
    spaceshipQ = createElement('h2', 'Boarding pass question: Do you use ad blockers?');
    spaceshipQ.style('color', '#B3B3B3');
    spaceshipQ.position(0.1 * width, 0.2 * height);
    spaceshipA = createElement('textarea', '');
    spaceshipA.class('basic-input');
    spaceshipA.style('font-size', '1.6em');
    spaceshipA.size(width / 4, height / 4);
    spaceshipA.position(0.1 * width, 0.3 * height);

    spaceshipNextB = createButton("Take off now");
    spaceshipNextB.class('continueButton-day');
    spaceshipNextB.mousePressed(function() {
        spaceshipAnswer = spaceshipA.value();
        if (spaceshipAnswer != '') {
            galaxyOfEmotions();
            boardingStarted = true;
        }
    });
}

function galaxyOfEmotions() {
    console.log("galaxy of emotions");
    boardingStarted = false;
    spaceshipMsg.remove();
    spaceshipNextB.remove();
    spaceshipImg.remove();
    spaceshipQ.remove();
    spaceshipA.remove();
    spaceshipNextB.remove();
    galaxyMsg = createElement('h1', passenger1 + ": We are travelling through the Galaxy of Emotions now. Let's stop by the planets to collect some emotions. (click on more than 5)");
    galaxyMsg.class('message-top');
    galaxyStarted = true;
}

function landing() {
    console.log("landing");
    galaxyMsg.remove();
    galaxyNextB.remove();
    planetImg = createImg('img/half-planet.png');
    planetImg.position(width * 0.125, landingMove);
    planetImg.size(width * 0.75, height / 1.4);
    landingImg = createImg('img/spaceship-above.png');
    landingImg.position(width / 4, landingMove);
    landingImg.size(width / 2, height / 1.4);
    landingMsg = createElement('h1', passenger2 + ": Look! We are landing on Datatopia");
    landingMsg.class('message-top');
    landingNextB = createButton('landing');
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
    skyBackground.remove();
    landingImg.remove();
    planetImg.remove();
    landingMsg.remove();
    landingNextB.remove();

    sceneryMsg = createElement('h1', passenger2 + ": Everything on Datatopia is made of words and sustained by new words from the tourists. Datatopia will not exist if no one comes to visit. Look, the scenery is especially striking at night.");
    sceneryMsg.class('message-top');
    sceneryNextB = createButton('next  →');
    sceneryNextB.class('continueButton-night');
    sceneryNextB.mousePressed(breathe1);

    sceneryStarted = true;
}

function breathe1() {
    mountainImg.remove();
    riverImg.remove();
    for (var i = 0; i < river.length; i++) {
        for (var j = 0; j < windowWidth / 100 - 1; j++) {
            river[i].waterList[j].remove();
        }
    }
    for (var m = 0; m < windowWidth / 20; m++) {
        for (var n = 0; n < (windowHeight * 0.75 - (windowHeight * 0.12 + windowWidth / 6)) / 20 - 1; n++) {
            grassList[m][n].remove();
        }
    }
    sceneryStarted = false;
    console.log("breathe1");
    sceneryMsg.remove();
    sceneryNextB.remove();
    breathMsg = createElement('h1', passenger1 + ": Even the air is made of words! Maybe it shouldn't be called AIR, but we can breathe it!!");
    breathMsg.class('message-center');
    breathNextB = createButton('breathe');
    breathNextB.class('continueButton-night');
    breathNextB.mousePressed(breathe2);

    breathStarted = true;
}

function breathe2() {
    console.log("breathe2");
    breathStarted = false;
    breathMsg.remove();
    breathNextB.remove();
    breathMsg2 = createElement('h1', passenger1 + ": Hmmm...");
    breathMsg2.class('message-top');
    breathNextB2 = createButton('next  →');
    breathNextB2.class('continueButton-night');
    breathNextB2.mousePressed(streetLamp);

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
    // breathNextB2.remove();

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
    breathStarted2 = false;
    lungImg.remove();
    for (var i = 0; i < airList.length; i++) {
        airList[i].air.remove();
    }
    breathMsg2.remove();
    breathNextB2.remove();

    console.log("street lamp");
    // xNextB2.remove();
    lampStarted = true;

    road = createImg('img/road.png');
    road.position(0, 0);
    road.size(width, height);
    lampMsg = createElement('h1', passenger1 + ": Answer questions to light up the street lamps and walk in the dark. (click on each lamp light after answering the question.)");
    lampMsg.class('message-top');
}

// function force() {
//   console.log("force");
//   lampMsg.remove();
//   lampNextB.remove();

//   console.log(lights[lights.length-1].photon);
//   for (var i = lights.length-1; i >= 0; i--) {
//     // console.log(lights[i].photon);
//     lights[i].photon.remove();
//     // lights.splice(0, i);
//     lightQList[i].remove();
//     lightBList[i].remove();
//     lightBList2[i].remove();
//     lightArea[i].remove();
//     questionsP[i].remove();
//   }
//   road.remove();
//   // endRoad.remove();
//   lampStarted = false;
//   forceMsg = createElement('h1', passenger2 + ": There's a deep hole at the end of the road. Gravity is distorted here. Try throwing some rocks into it.");
//   forceMsg.class('message-top');
//   forceStarted = true;
//   console.log(lights);
// }

function force() {
    console.log("force");
    lampMsg.remove();
    lampNextB.remove();
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
    // endRoad.remove();
    lampStarted = false;

    // fix this later
    // var whiteBackground = createDiv('');
    // whiteBackground.size(windowWidth, windowHeight);
    // whiteBackground.position(0, 0);
    // whiteBackground.style('background-color', 'white');

    forceMsg = createElement('h1', passenger2 + ": There's a deep hole at the end of the road. Gravity is distorted here. Try throwing some rocks into the hole.");

    forceMsg.class('message-top');
    forceStarted = true;
    console.log(lights);
}

function storyBox() {
    // for (var i = 0; i < lights.length; i++) {
    //     lights[i].photon.remove();
    // }
    forceMsg.remove();
    forceNextB.remove();
    pitImg.remove();
    for (var i = 0; i < rocks.length; i++) {
        rocks[i].wordRock.remove();
    }
    boxMsg = createElement('h1', passenger2 + ": Hey " + name + "! This is what we really want to show you. Put in the one-digit passcode from the deep hole and open this box. (click on the box)");
    boxMsg.class('message-top');
    boxImg = createImg('img/box.png');
    boxImg.size(0.4 * width, 0.4 * width);
    boxImg.position(0.3 * width, 0.25 * height);
    boxImg.mousePressed(function() {
        boxPass = createElement('textarea', '');
        boxPass.class('basic-input');
        boxPass.size(100, 140);
        boxPass.position(width / 2 - 50, height * 0.3);
        boxPass.style('font-size', '10em');
        boxPass.style('overflow', 'hidden');
    })
    boxNextB = createButton('open');
    boxNextB.class('continueButton-day');
    boxNextB.mousePressed(function() {
        console.log(boxPass.value());
        // if (boxPass.value().length >= 1) {
        //   boxPass.value().length = 1;

        // if (boxPass.value() == '7') {
        //   finalEnd();s
        //   theEnd = true;
        // }
        if (/[7]/g.test(boxPass.value())) {
            finalEnd();
            theEnd = true;
        }
        //}
    });
    forceStarted = false;
}

function finalEnd() {
    boxMsg.remove();
    boxNextB.remove();
    boxPass.remove();
    boxImg.remove();
    //boxImg2 = createImg();
    endMsg = createElement('h1', "??: We are glad you found this special box, where we keep a record of every visitor's experience on Datatopia. Your experience is always more than you can imagine.");
    endMsg.class('message-center');
    endB = createButton('view your record');
    endB.class('basic-Button');
    endB.position(width / 2 - 97, height * 0.6);
    endB.mousePressed(function() {
        var waitMsg = createElement('h1', 'Please wait for a moment...');
        waitMsg.class('message-center');
        sendToServer();
    });

}

function sendToServer() {
    if (theEnd) {
        socket.emit('toServer', {
            name: name,
            hair: hairChoice,
            spaceshipA: spaceshipAnswer,
            emotions: emotions,
            lampA: lampAnswers
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
