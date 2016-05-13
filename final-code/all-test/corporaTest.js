var corpora = require('corpora-project');

// adj = corpora.getFiles('words');

// basics
var nouns = corpora.getFile('words', 'nouns');
var verbs = corpora.getFile('words', 'verbs');
var adjs = corpora.getFile('words', 'adjs');
var advs = corpora.getFile('words', 'adverbs');

// more
var arts = corpora.getFile('art', 'isms');
var webColors = corpora.getFile('colors', 'web_colors');
var fruits = corpora.getFile('foods', 'fruits');
var teas = corpora.getFile('foods', 'tea');
var vegetables = corpora.getFile('foods', 'vegetables');
