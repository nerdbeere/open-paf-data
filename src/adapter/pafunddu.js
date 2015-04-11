var AbstractRssAdapter = require('./abstract-rss-adapter');
var inherits = require('util').inherits;
var crypto = require('crypto');

function LandkreisPfaffenhofen(handler) {
  AbstractRssAdapter.apply(this);
  this.url = 'http://www.pafunddu.de/feed/action/mode/realm/ID/0/';
  this.tags = ['official'];
  this.id = 'paf-und-du-de';
  this._handler = handler;
  this.type = 'news';
}

LandkreisPfaffenhofen.type = 'news';

inherits(LandkreisPfaffenhofen, AbstractRssAdapter);

var proto = LandkreisPfaffenhofen.prototype;

proto.generalize = function(news) {
  var tags = news.categories || [];
  tags = tags.concat(this.tags);

  var shasum = crypto.createHash('sha1');
  shasum.update(news.guid);
  var description = news.description.replace(/\r\n\r\n/g, ' ');

  var data = {
    type: this.getType(),
    title: this._sanitize(news.title),
    text: this._sanitize(description),
    date: new Date(news.pubDate),
    tags: tags,
    link: news.link,
    identifier: shasum.digest('hex'),
    adapter: this.id,
    author: news.author
  };

  return data;
};

module.exports = LandkreisPfaffenhofen;