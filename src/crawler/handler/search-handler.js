var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');

function SearchHandler(r) {
  AbstractHandler.apply(this, arguments);
  this._table = 'search';
}

inherits(SearchHandler, AbstractHandler);

var proto = SearchHandler.prototype;

module.exports = SearchHandler;
