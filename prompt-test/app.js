var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);
var prompt = require('prompt');

app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);


var choice = 0;

function gettingInput() {
    prompt.start();
    var message;
    prompt.get(['option'], function(err, result) {
      message = result.option;
      gettingInput();
    });
    return message;
  }

choice = gettingInput();
