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

// var APIKEY = '';
// var Wordnik = require('wordnik-bb').init(APIKEY);
// var word = new Wordnik.Word({word: 'king', params:{includeSuggestions:true}});
// word.getEverything()
//  .then( function() {
//     console.log("A WHOLE lot of data in a Word model: ", word);
//   });

var cfg = {
    "<start>": "<np> <vp>. | <np> <vp>, <clause1>. | <clause1>, <np> <vp>.",
    "<np>": "<det> <n>[3] | <det> <adj> <n>[2] | <det> <adv> <adj> <n>",
    "<vp>": "<v> | <v> <np>[3] | <adv> <v> | <adv> <v> <np>[2]",
    "<det>": "a | the[4]",
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

//console.log(grammar.hasRule("<6>"));

//console.log(grammar);
//grammar.loadFrom(grammarJSON);
// grammar.loadFrom('test.json');

//console.log(grammar.ready());

var result = grammar.expand();
// var result0 = result.split("%");
console.log(result);
