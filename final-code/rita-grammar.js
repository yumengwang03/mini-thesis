// testing several options for text generation in this separate file

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

var ConceptNet = require('concept-net');
var conceptNet = ConceptNet();

var testWord = 'anxious';
conceptNet.association('/list/en/' + testWord, {
    limit: 50
        //filter: '/c/en/donut'
}, function onDone(err, result) {
    var scores = [];
    //console.log(result);
    for (var i = 0; i < result.similar.length; i++) {
        var score = result.similar[i][1];
        scores.push(score);
    }
    //console.log(scores);
})

// conceptNet.lookup('/c/en/' + testWord, {
//     limit: 10,
//     offset: 0,
//     //features: 'driver',
//     filter: 'core'
// }, function onDone(err, result) {
//     var relatedPhrases = [];
//     for (var i = 0; i < result.edges.length; i++) {
//       var relatedPhrase = result.edges[i].end;
//         if (relatedPhrase != null) {
//             relatedPhrases.push(relatedPhrase);
//         }
//     }
//     console.log(relatedPhrases);
// });

// directions
var directions = ["←", "→", "↑", "↓", "↖", "↘", "↗", "↙", "↺", "↻", "↵", "↳", "↲", "↱", "↶", "↷"];

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

function cfgGenerate() {
    var data_noun = getNonTerminals(nouns);
    var data_verb = getNonTerminals(verbs_past);
    var data_verb_ing = getNonTerminals(verbs_ing);
    var data_adj = getNonTerminals(adjs);
    var data_adv = getNonTerminals(advs);

    grammar.addRule("<n>", data_noun, 1);
    grammar.addRule("<v>", data_verb, 1);
    grammar.addRule("<v_ing>", data_verb_ing, 0.5);
    grammar.addRule("<adj>", data_adj, 1);
    grammar.addRule("<adv>", data_adv, 1);

    //console.log(grammar.hasRule("<n>"));
    //console.log(grammar.ready());

    var result = [];
    for (var i = 0; i < 10; i++) {
        var oneSentence = grammar.expand();
        var rs = rita.RiString(oneSentence);
        oneSentence0 = rs._text.replace(rs._text.charAt(0), rs._text.charAt(0).toUpperCase());
        result.push(oneSentence0);
    }
    var finalResult = result.join(" ");
    return finalResult;
}
var cfgText = cfgGenerate();
//console.log(cfgText);

// Markov chain
var rm = rita.RiMarkov(2);

function markovGenerate() {
    var rmOutputs = [];
    rm.loadFrom('markov_data/Roadside_Picnic.txt', function() {
        console.log(rm.ready());
        //var rmOutput = rm.generateSentences(10);
        //console.log(rmOutput);
        for (var i = 0; i < 10; i++) {
            rmOutputs.push(rm.generateSentences(1));
            //rmOutputs.push(rm.generateTokens(1));
        }
        console.log(rmOutputs);
    });
    return rmOutputs;
}

var markovText = markovGenerate();
//console.log(markovText);

function mapInstruction(A, B, C, ad) {
    var adblock;
    if (ad) {
        adblock = "Please wait in the lounge and enjoy some ads: ";
    } else {
        adblock = "Please wait in our ads-free lounge."
    }
    var structure = {
      var b = "  ";
      var r = "→ ";
      var l = "← ";
      var u = "↑ ";
      var d = "↓ ";
      var textSpace = [
        [b, b, b, b, b, b, b, b, u, r, r, r, r, r, r, r, r, r, r, r, "\n"],
        [b, b, b, b, b, b, b, b, u, b, b, b, b, b, b, b, b, b, b, b, "\n"],
        [b, b, b, b, b, b, b, b, u, b, b, b, b, b, b, b, b, b, b, b, "\n"],
        [r, r, r, r, r, r, r, r, u, b, b, b, b, b, b, b, b, b, b, b, "\n"],
        [b, b, b, b, b, b, b, b, u, r, r, r, r, r, r, r, r, r, r, r, "\n"],
        [b, b, b, b, b, b, b, b, u, b, b, b, b, b, b, b, b, b, b, b, "\n"],
        [b, b, b, b, b, b, b, b, u, b, b, b, b, b, b, b, b, b, b, b, "\n"],


      ];
        // title: "Datatopia",
        // traveler: "Traveler: " + "A";
        // second_traveler: directions[floor(random(0, directions.length))] + " in order to find" + "B" + "to travel with you",
        // third_traveler: directions[floor(random(0, directions.length))] + " in order to meet with" + "C" + "who can be your tour guide",
        // boarding: directions[floor(random(0, directions.length))] + "to board spaceship. " + adblock;
        // galaxy: directions[floor(random(0, directions.length))] + "This way to the Galaxy of Emotions. " + "something else",
        // landing: directions[floor(random(0, directions.length))] + "",
        // air: directions[floor(random(0, directions.length))] + "",
        // road: directions[floor(random(0, directions.length))] + "",
        // rock: directions[floor(random(0, directions.length))] + "",
        // box: directions[floor(random(0, directions.length))] + "",
        // end: directions[floor(random(0, directions.length))] + ""
    }
}
