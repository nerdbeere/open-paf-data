var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');

function SearchHandler() {
  AbstractHandler.apply(this);
  this._table = 'search';
}

inherits(SearchHandler, AbstractHandler);

var proto = SearchHandler.prototype;

module.exports = SearchHandler;