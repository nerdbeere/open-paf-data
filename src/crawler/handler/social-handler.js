var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');

function SocialHandler(r) {
  AbstractHandler.apply(this, arguments);
  this._table = 'social';
}

inherits(SocialHandler, AbstractHandler);

var proto = SocialHandler.prototype;

module.exports = SocialHandler;
