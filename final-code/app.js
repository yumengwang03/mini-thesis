// reference: Lucy's web app example, Ayo's Lab-Systems

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');

// using npm printer
var printer = require("printer/lib"),
    filename = "output/record.txt";

// store user input in a local JSON file
var JSONpath = 'data';
// var JSONfile = 'input-data.JSON';

var startWriting = false;

var corpora = require('corpora-project');

// basics
var nouns = corpora.getFile('words', 'nouns').nouns;

function getVerbs(tense) {
    var verbList = corpora.getFile('words', 'verbs').verbs;
    var verb_tense_list = [];
    if (tense == "past") {
        for (var i = 0; i < verbList.length; i++) {
            verb_tense_list.push(verbList[i].past);
        }
    } else if (tense == "ing") {
        for (var i = 0; i < verbList.length; i++) {
            verb_tense_list.push(verbList[i].present + "ing");
        }
    }
    return verb_tense_list;
}
var verbs_past = getVerbs("past");
var verbs_ing = getVerbs("ing");
var adjs = corpora.getFile('words', 'adjs').adjs;
var advs = corpora.getFile('words', 'adverbs').adverbs;
// more
var arts = corpora.getFile('art', 'isms');
var webColors = corpora.getFile('colors', 'web_colors');
var fruits = corpora.getFile('foods', 'fruits');
var teas = corpora.getFile('foods', 'tea');
var vegetables = corpora.getFile('foods', 'vegetables');

var rita = require('rita');
var cfg = {
    "<start>": "<np> <vp>. | <np> <vp>, <clause1>. | <clause1>, <np> <vp>.",
    "<np>": "<det> <n>[3] | <det> <adj> <n>[2] | <det> <adv> <adj> <n>",
    "<vp>": "<v> | <v> <np>[3] | <adv> <v> | <adv> <v> <np>[2]",
    "<det>": "a | the[4] | his | her | its",
    // <v>
    // <v_ing>
    // <n>
    // <adj>
    // <adv>
    "<location>": "in | on | at | in front of | before | after | above | below | through",
    "<clause1>": "<v_ing> <np> | <v_ing> <location> <np> | <v> <np> | <v> <location> <np>"
}
var grammar = rita.RiGrammar(cfg);

function getNonTerminals(pos) {
    var nonTerminals;
    for (var i = 0; i < pos.length; i++) {
        nonTerminals += pos[i] + " | ";
    }
    return nonTerminals;
}

function cfgGenerate(myAdj, length) {
    var data_noun = getNonTerminals(nouns);
    var data_verb = getNonTerminals(verbs_past);
    var data_verb_ing = getNonTerminals(verbs_ing);
    var data_adj = getNonTerminals(adjs);
    var data_adv = getNonTerminals(advs);

    grammar.addRule("<n>", data_noun, 1);
    grammar.addRule("<v>", data_verb, 1);
    grammar.addRule("<v_ing>", data_verb_ing, 0.5);
    grammar.addRule("<adv>", data_adv, 1);

    if (myAdj == "default") {
        grammar.addRule("<adj>", data_adj, 1);
    } else {
        grammar.addRule("<adj>", myAdj, 1);
    }

    //console.log(grammar.hasRule("<n>"));
    //console.log(grammar.ready());

    var result = [];
    for (var i = 0; i < length; i++) {
        var oneSentence = grammar.expand();
        var rs = rita.RiString(oneSentence);
        oneSentence0 = rs._text.replace(rs._text.charAt(0), rs._text.charAt(0).toUpperCase());
        result.push(oneSentence0);
    }
    var finalResult = result.join(" ");
    return finalResult;
}

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
console.log(__dirname + '/');

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

var port = 8080;
var server = app.listen(port, function() {
    console.log("Started on port: " + port);
});
var io = require("socket.io").listen(server);

io.sockets.on('connection',
    function(socket) {
        console.log("New client: " + socket.id);
        socket.on('toServer',
            function(data) {
                var inputName = data.name;
                var inputHair = data.hair;
                var inputSpaceA = data.spaceshipA;
                var inputEmotions = data.emotions;
                var inputLampA = data.lampA;
                //console.log(inputName);

                // write the input to name.JSON
                fs.readFile(JSONpath + '/name.JSON', 'utf8', function(err, data) {
                    var data = JSON.parse(data);
                    // add new input
                    data.unshift({
                        id: new Date().getTime(),
                        name: inputName,
                        hair: inputHair,
                        spaceA: inputSpaceA,
                        emotions: inputEmotions,
                        lampA: inputLampA
                    });
                    // update/rewrite the file
                    fs.writeFile(JSONpath + '/name.JSON', JSON.stringify(data), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File saved!");
                            textSample();
                        }
                    });
                });
            }
        );
        fs.readFile(JSONpath + '/name.JSON', 'utf8', function(err, data) {
            var info = JSON.parse(data);
            var passenger1 = info[0].name;
            var passenger2 = info[1].name;
            socket.emit('toClient', {
                traveller1: passenger1,
                traveller2: passenger2
            });
        });
        socket.on('disconnect', function() {
            console.log("Client has disconnected");
        });
    }
);

function getPreviousInput(filepath, encoding) {
    var previousInput = [];
    var previousSize = 3;
    if (typeof(encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    var data = JSON.parse(file);
    for (var i = 0; i < previousSize; i++) {
        previousInput.push(data[i]);
    }
    return previousInput;
}

function textAssemble() {
    // var directions = ["←", "→", "↑", "↓", "↖", "↘", "↗", "↙", "↺", "↻", "↵", "↳", "↲", "↱", "↶", "↷"];
    var directions = ["←", "→", "↑", "↓", "↖", "↘", "↺", "↻"];
    var previousJson = getPreviousInput(JSONpath + '/name.JSON');
    // ahh this needs to improve if I have more time
    if (previousJson.spaceA == "No") {
        adblock = "Please wait in the lounge and enjoy some ads: ";
    } else {
        adblock = "Please wait in our ads-free lounge."
    }

    var cfgText_emotion = cfgGenerate(previousJson[0].emotions, 5);
    // this part is crappy right now
    var structure = {
        title: "Datatopia",
        traveler: "Traveler: " + previousJson[0].name + ", " + previousJson[1].name + ", " + previousJson[2].name,
        boarding: directions[Math.floor(Math.random() * directions.length)] + "  To board spaceship. " + adblock,
        galaxy: directions[Math.floor(Math.random() * directions.length)] + "  This way to the Galaxy of Emotions. " + cfgText_emotion,
        landing: directions[Math.floor(Math.random() * directions.length)] + "  We are landing soon. ",
        air: directions[Math.floor(Math.random() * directions.length)] + "  Datatopia is a world made of you and other visitor's shared information. " + cfgGenerate("default", 8),
        road: directions[Math.floor(Math.random() * directions.length)] + "  Keep going down the road and discover more. " + cfgGenerate("default", 10),
        rock: directions[Math.floor(Math.random() * directions.length)] + "  You look for a passcode. " + cfgGenerate("default", 8),
        box: directions[Math.floor(Math.random() * directions.length)] + "  7... 7... " + cfgGenerate("default", 6),
        end: directions[Math.floor(Math.random() * directions.length)] + "  Thank you for visiting Datatopia!"
    }
    var fullText = structure.title + "\n" + "\n"+ structure.traveler + "\n" + "\n"+ structure.boarding + "\n" + "\n"+ structure.galaxy + "\n" + "\n"+ structure.landing + "\n" + "\n"+ structure.air + "\n" + "\n"+ structure.road + "\n" + "\n"+ structure.rock + "\n" + "\n"+ structure.box + "\n" + "\n"+ structure.end;
    console.log(fullText);
    return fullText;
}


// just trying out different things
// function textMap() {
//     var b = "  ";
//     var r = "→ ";
//     var l = "← ";
//     var u = "↑ ";
//     var d = "↓ ";
//     var names = ["Yumeng", "Zanzie", "Michael"];
//     var launchMsg = "Welcome on board. Enjoy our ads-free lounge."
//
//     // var textSpace = [
//     //     [b, b, b, b, b, b, b, b, b, d, r, r, r, r, r, r, r, r, r, r, r, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, d, names[2], "\n"],
//     //     [b, b, b, b, b, b, b, b, b, d, names[1], "\n"],
//     //     [r, r, r, r, r, r, r, r, r, d, names[0], "\n"],
//     //     [b, b, b, b, b, b, b, b, b, d, r, r, r, r, r, r, r, r, r, r, d, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, b, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, launchMsg, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, d, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, d, b, b, b, b, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, l, l, l, l, l, l, l, l, l, l, d, r, r, r, r, "\n"],
//     //     [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, l, "Galaxy of Emotions", "\n"],
//     // ];
//     // var fullMap = "";
//     // for (var i = 0; i < textSpace.length; i++) {
//     //     for (var j = 0; j < textSpace[i].length; j++) {
//     //         fullMap += textSpace[i][j];
//     //     }
//     // }
//     return fullMap;
// }


function textSample() {
    var printTxt = textAssemble();

    fs.writeFile(filename, printTxt, 'utf8', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("file ready to print");
            sendToPrinter();
        }
    });
}

// after overwriting the file with a new version, send it to printer
function sendToPrinter() {
    console.log('platform:', process.platform);
    console.log('try to print file: ' + filename);
    if (process.platform != 'win32') {
        printer.printFile({
            filename: filename,
            printer: process.env[3],
            success: function(jobID) {
                console.log("sent to printer with ID: " + jobID);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
}
