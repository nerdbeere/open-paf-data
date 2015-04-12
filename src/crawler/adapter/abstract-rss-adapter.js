var Rss = require('../../shared/rss');
var inherits = require('util').inherits;
var AbstractAdapter = require('./abstract-adapter');

function AbstractRssAdapter() {
  AbstractAdapter.apply(this);
}

inherits(AbstractRssAdapter, AbstractAdapter);

var proto = AbstractRssAdapter.prototype;

proto.crawl = function(callback) {
  callback = callback || function() {};
  if(!this.url) {
    throw new Error('URL must be defined in adapter');
  }
  new Rss(this.url, function(err, data) {
    var unifiedData = data.map(this.generalize.bind(this));
    this._save(unifiedData, callback);
  }.bind(this));
};

module.exports = AbstractRssAdapter;