var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');

function SocialHandler() {
  AbstractHandler.apply(this);
  this._table = 'social';
}

inherits(SocialHandler, AbstractHandler);

var proto = SocialHandler.prototype;

module.exports = SocialHandler;