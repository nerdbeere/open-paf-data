var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');

function NewsHandler() {
  AbstractHandler.apply(this);
  this._table = 'news';
}

inherits(NewsHandler, AbstractHandler);

var proto = NewsHandler.prototype;

module.exports = NewsHandler;