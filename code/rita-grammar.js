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
 //
 //
 // var grammar = 	addRule('testGrammar', 'simple', 0.8);


// var nativeObject = YAML.load('test.yaml');
//YAML = require('yamljs');

 // parse YAML string

 var grammarJSON = {
   "<start>": "<5-line> % <7-line> % <5-line>",
   "<5-line>": "<1> <4> |<1> <3> <1> |<1> <1> <3> | <1> <2> <2> | <1> <2> <1> <1> | <1> <1> <2> <1> | <1> <1> <1> <2> | <1> <1> <1> <1> <1> | <2> <3> | <2> <2> <1> | <2> <1> <2> | <2> <1> <1> <1> | <3> <2> | <3> <1> <1> | <4> <1> | <5>",
   "<7-line>": "<1> <1> <5-line> | <2> <5-line> | <5-line> <1> <1> | <5-line> <2>",
   "<1>": "red | white | black | sky | dawns | breaks | falls | leaf | rain | pool | my | your | sun | clouds | blue | green | night | day | dawn | dusk | birds | fly | grass | tree | branch | through | hell | zen | smile | gray | wave | sea | through | sound | mind | smoke | cranes | fish",
   "<2>": "drifting | purple | mountains | skyline | city | faces | toward | empty | buddhist | temple | japan | under | ocean | thinking | zooming | rushing | over | rice field | rising | falling | sparkling | snowflake",
   "<3>": "sunrises | pheasant farms | people farms | samurai | juniper | fishing boats | far away | kimonos | evenings | peasant rain | sad snow fall",
   "<4>": "aluminum | yakitori | the east village | west of the sun |  chrysanthemums | cherry blossoms",
   "<5>": "resolutional | non-elemental | rolling foothills rise | toward mountains higher | out over this country | in the springtime again"
 }



//
// var rg = new RiGrammar(sentenceGrammarJSON);

// var grammar;
grammar = rita.RiGrammar('http://rednoise.org/rita/examples/dom/HaikuGrammar/#source2');
//console.log(grammar);
//grammar.loadFrom(grammarJSON);
// grammar.loadFrom('test.json');
 console.log(grammar.ready());




var result = grammar.expand();
var haiku = result.split("%");
console.log(haiku);

//grammar.loadFrom("<start>: [ <rule1>, <rule2>, <rule3> ] <rule2>: [ terminal1, terminal2, <rule1> ]");
 //RiGrammar.expandFrom('<start>');


 // var test = yaml.load('test.yaml')
 // var grammarLoaded =grammar.load(test);
 // var result = grammarLoaded.expand();
 // var haiku = result.split("%");
 // console.log(result);
