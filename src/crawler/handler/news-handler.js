var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');

function NewsHandler(r) {
  AbstractHandler.apply(this, arguments);
  this._table = 'news';
}

inherits(NewsHandler, AbstractHandler);

var proto = NewsHandler.prototype;

module.exports = NewsHandler;
