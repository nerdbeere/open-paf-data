var AbstractAdapter = require('./abstract-adapter');
var inherits = require('util').inherits;
var crypto = require('crypto');
var google = require('google');

function Google(handler) {
  AbstractAdapter.apply(this);
  this.tags = ['google'];
  this.id = 'google';
  this._handler = handler;
  this.type = 'search';
}

Google.type = 'search';

inherits(Google, AbstractAdapter);

var proto = Google.prototype;

proto.generalize = function(searchResult) {
  if(!searchResult.href) return false;
  var shasum = crypto.createHash('sha1');
  shasum.update(searchResult.href);
  return {
    type: this.getType(),
    adapter: this.id,
    tags: this.tags,
    title: searchResult.title,
    link: searchResult.href,
    identifier: shasum.digest('hex'),
    abstract: searchResult.description
  };
};

proto.crawl = function(callback) {
  google.resultsPerPage = 25;
  google.lang = 'de';
  google.tld = 'de';
  google.nextText = 'Weiter';

  var pages = 10;
  var data = [];

  google('pfaffenhofen ilm', function(err, next, links) {
    var unifiedData = links.map(this.generalize.bind(this));
    data = data.concat(unifiedData);
    pages--;
    if(pages === 0 || !next) {
      return this._save(data, callback);
    }
    next();
  }.bind(this));
};

  module.exports = Google;