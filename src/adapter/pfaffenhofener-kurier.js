var AbstractRssAdapter = require('./abstract-rss-adapter');
var inherits = require('util').inherits;
var crypto = require('crypto');

function PfaffenhofenerKurier(handler) {
  AbstractRssAdapter.apply(this);
  this.url = 'http://rss.feedsportal.com/c/760/f/10078/index.rss';
  this.tags = ['newspaper'];
  this.id = 'pfaffenhofener-kurier';
  this._handler = handler;
  this.type = 'news';
}

PfaffenhofenerKurier.type = 'news';

inherits(PfaffenhofenerKurier, AbstractRssAdapter);

var proto = PfaffenhofenerKurier.prototype;

proto.generalize = function(news) {

  var shasum = crypto.createHash('sha1');
  shasum.update(news.guid);

  var data = {
    type: this.getType(),
    title: this._sanitize(news.title),
    abstract: this._sanitize(news.description),
    date: new Date(news.pubDate),
    tags: this.tags,
    link: news.guid,
    identifier: shasum.digest('hex'),
    adapter: this.id,
    author: 'admin'
  };

  return data;
};

module.exports = PfaffenhofenerKurier;