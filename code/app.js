// reference: Lucy's web app example, Ayo's Lab-Systems

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');

// using npm printer
var printer = require("printer/lib"),
    filename = "output/utopia.txt";

// store user input in a local JSON file
var JSONpath = 'data';
var JSONfile = 'input-data.JSON';

var selectedText = [];
var dataKeys = [];
var inputKeys;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log(__dirname + '/');

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

app.post('/input', function(req, res) {
  var Twitter = req.body.twt;
  var answer = req.body.txt;
  var mode;
  if (Twitter !== "" && answer === "") {
    mode = 0;
  } else if (answer !== "" && Twitter === ""){
    mode = 1;
  }
  console.log("From Client: Twitter: " + Twitter + " and answer: " + answer);

  fs.readFile(JSONpath + '/' + JSONfile, 'utf8', function(err, data) {
    data = JSON.parse(data);
    // add new input
    data.unshift({
      id: new Date().getTime(),
      TwitterUser: Twitter,
      TextInput: answer
    });
    // update/rewrite the file
    fs.writeFile(JSONpath + '/' + JSONfile, JSON.stringify(data), function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("File saved!");
        res.json({
          status: 'OK'
        });
        if(mode == 0) {
          selectedText = getTexts(0);
          selectedText.unshift(Twitter);
        } else if (mode == 1) {
          selectedText = getTexts(1);
          selectedText.unshift(answer);
        }
      }
    });
  });
});

var port = 8080;
app.listen(port, function() {
  console.log("Started on port: " + port);
});

function getTexts(option) {
  var selected = [];
  var selectedSize = 4;
  fs.readFile(JSONpath + '/' + JSONfile, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      for (var i = 0; i < selectedSize; i++) {
        if (option == 0) {
          selected[i] = data[i].TwitterUser;
        } else if (option == 1) {
          selected[i] = data[i].TextInput;
        }
      }
      console.log(selected);
    }
  });
  return selected;
}

// process the text
function textAssemble() {

}

//textSample();
// text samples to compare tf-idf
function textSample() {
  // fs.readdirSync('data/sampleTxt', 'utf8', function(err, files) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     for (var i = 0; i < files.length; i++) {
  //       console.log(files[i]);
  //     }
  //     console.log("test");
    var printTxt;
    var sampleData = ['data1.txt', 'data2.txt', 'data3.txt', 'data4.txt', 'data5.txt'];
    for (var i = 0; i < sampleData.length - 4; i++) {
      fs.readFile('data/sampleTxt/' + sampleData[i], 'utf8', function(err, data) {
        if (err) {
          console.log(err);
        } else {
          printTxt = data;
          fs.writeFile('output/utopia.txt', printTxt, 'utf8', function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("file ready to print");
              sendToPrinter();
            }
          });
        }
      });
    }
  //if(!fs.existsSync('output/utopia.txt')){
    //}
}

// after overwriting the file with a new version, send it to printer
function sendToPrinter() {
  console.log('platform:', process.platform);
  console.log('try to print file: ' + filename);
  if(process.platform != 'win32') {
    printer.printFile({
      filename: filename,
      printer: "yumeng_printer",
      success: function(jobID){
        console.log("sent to printer with ID: "+jobID);
      },
      error:function(err){
        console.log(err);
      }
    });
  }
}

// concordance
function textAnalyze(text) {
  var concordance = {};
  var keys = [];
  var tokens = text.split(/\W+/);

  for (var i = 0; i < tokens.length; i++) {
    var word = tokens[i];
    if (concordance[word] === undefined) {
      concordance[word] = 1;
      keys.push(word);
    } else {
      concordance[word]++;
    }
  }
  keys.sort(function(a, b) {
    return (concordance[b] - concordance[a]);
  });
  return {
    keys: keys,
    concordance: concordance,
    tokens: tokens
  };
}
