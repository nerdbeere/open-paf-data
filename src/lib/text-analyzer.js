var natural = require('natural');
var lodash = require('lodash');

var irrelevantWords = ["die", "der", "und", "in", "zu", "den", "das", "nicht", "von", "sie", "ist", "des", "sich", "mit", "dem", "dass", "er", "es", "ein", "ich", "auf", "so", "eine", "auch", "als", "an", "nach", "wie", "im", "für", "man", "aber", "aus", "durch", "wenn", "nur", "war", "noch", "werden", "bei", "hat", "wir", "was", "wird", "sein", "einen", "welche", "sind", "oder", "zur", "um", "haben", "einer", "mir", "über", "ihm", "diese", "einem", "ihr", "uns", "da", "zum", "kann", "doch", "vor", "dieser", "mich", "ihn", "du", "hatte", "seine", "mehr", "am", "denn", "nun", "unter", "sehr", "selbst", "schon", "hier", "bis", "habe", "ihre", "dann", "ihnen", "seiner", "alle", "wieder", "meine", "Zeit", "gegen", "vom", "ganz", "einzelnen", "wo", "muss", "ohne", "eines", "können", "sei", "a", "wurde", "jetzt", "immer", "seinen", "wohl", "dieses", "ihren", "würde", "diesen", "sondern", "weil", "welcher", "nichts", "diesem", "alles", "waren", "will", "Herr", "viel", "mein", "also", "soll", "worden", "lassen", "dies", "machen", "ihrer", "weiter", "Leben", "recht", "etwas", "keine", "seinem", "ob", "dir", "allen", "großen", "Jahre", "Weise", "müssen", "welches", "wäre", "erst", "einmal", "Mann", "hätte", "zwei", "dich", "allein", "Herren", "während", "Paragraph", "anders", "Liebe", "kein", "damit", "gar", "Hand", "Herrn", "euch", "sollte", "konnte", "ersten", "deren", "zwischen", "wollen", "denen", "dessen", "sagen", "bin", "Menschen", "gut", "darauf", "wurden", "weiß", "gewesen", "Seite", "bald", "weit", "große", "solche", "hatten", "eben", "andern", "beiden", "macht", "sehen", "ganze", "anderen", "lange", "wer", "ihrem", "zwar", "gemacht", "dort", "kommen", "Welt", "heute", "Frau", "werde", "derselben", "ganzen", "deutschen", "lässt", "vielleicht", "meiner"];

function TextAnalyzer(text) {
  this._text = text;
  this._tokenized = null;
  this._reduced = null;
}

var proto = TextAnalyzer.prototype;

proto.tokenize = function() {
  if (this._tokenized) {
    return this._tokenized;
  }
  var tokenizer = new natural.RegexpTokenizer({pattern: /[^a-z0-9äâàéèëêïîöôùüß]+/i});
  this._tokenized = tokenizer.tokenize(this._text);
  return this._tokenized;
};

proto.reduce = function() {
  if (this._reduced) {
    return this._reduced;
  }
  var tokenized = this.tokenize();

  this._reduced = [];
  tokenized.forEach(function(word) {
    word = word.toLowerCase();
    if (this._reduced.indexOf(word) !== -1) return;
    if (irrelevantWords.indexOf(word) !== -1) return;
    this._reduced.push(word);
  }.bind(this));

  return this._reduced;
};

proto.compare = function(textAnalyzer) {
  var words1 = this.reduce();
  var words2 = textAnalyzer.reduce();

  var intersection = lodash.intersection(words1, words2);

  return intersection.length * 100 / words1.length;
};

module.exports = TextAnalyzer;

