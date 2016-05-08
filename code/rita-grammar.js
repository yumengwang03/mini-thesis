var corpora = require('corpora-project');

// basics
var nouns = corpora.getFile('words', 'nouns').nouns;

function getVerbs() {
    var verbList = corpora.getFile('words', 'verbs').verbs;
    var verbsPast = [];
    for (var i = 0; i < verbList.length; i++) {
        verbsPast.push(verbList[i].past);
    }
    return verbsPast;
}
var verbs = getVerbs();

var adjs = corpora.getFile('words', 'adjs').adjs;
var advs = corpora.getFile('words', 'adverbs').adverbs;

// more
var arts = corpora.getFile('art', 'isms');
var webColors = corpora.getFile('colors', 'web_colors');
var fruits = corpora.getFile('foods', 'fruits');
var teas = corpora.getFile('foods', 'tea');
var vegetables = corpora.getFile('foods', 'vegetables');

var rita = require('rita');
// var r = rita.RiTa;
// var grammar = rita.RiGrammar;
// var rs = rita.RiString("The elephant took a bite!");
// //console.log(rs.features());
//
// // var grammar, yaml;
//
// var test = rs.analyze();
// //console.log(test);
//
// var apple = r.getPosTags(rs);
// console.log(apple);

// var APIKEY = 'a644d55cb27d36059d70e0deac5021b42eb12486bc0b530c8';
// var Wordnik = require('wordnik-bb').init(APIKEY);
// var word = new Wordnik.Word({word: 'king', params:{includeSuggestions:true}});
// word.getEverything()
//  .then( function() {
//     console.log("A WHOLE lot of data in a Word model: ", word);
//   });



//console.log(grammarJSON);

var cfg = {
    "<start>": "<np> <vp>",
    "<np>": "<det> <n> | <det> <adj> <n> | <det> <adv> <adj> <n>",
    "<vp>": "<v> | <v> <np>[2] | <adv> <v> | <adv> <v> <np>",
    "<det>": "a | the"
    // <v>
    // <n>
    // <adj>
    // <adv>
}


var grammar = rita.RiGrammar(cfg);

// console.log(grammar["<start>"]);
var testData = "Yumeng | Chuck | Fame | Umi";


// console.log(nouns.nouns[10]);

function getNonTerminals(pos) {
    var nonTerminals;
    for (var i = 0; i < pos.length; i++) {
        nonTerminals += pos[i] + " | ";
    }
    return nonTerminals;
}

var data_noun = getNonTerminals(nouns);
var data_verb = getNonTerminals(verbs);
//console.log(data_verb);

grammar.addRule("<n>", data_noun, 1);
grammar.addRule("<v>", data_verb, 1);

//console.log(grammar.hasRule("<6>"));

//console.log(grammar);
//grammar.loadFrom(grammarJSON);
// grammar.loadFrom('test.json');

//console.log(grammar.ready());

var result = grammar.expand();
// var result0 = result.split("%");
console.log(result);
