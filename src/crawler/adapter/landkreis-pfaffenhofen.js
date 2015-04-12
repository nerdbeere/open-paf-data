var AbstractRssAdapter = require('./abstract-rss-adapter');
var inherits = require('util').inherits;

function LandkreisPfaffenhofen(handler) {
  AbstractRssAdapter.apply(this);
  this.url = 'http://www.landkreis-pfaffenhofen.de/rss/news/rss.ashx?rss=true&data=uaBvZUdH2fY=';
  this.tags = ['official'];
  this.id = 'landkreis-pfaffenhofen-de';
  this._handler = handler;
  this.type = 'news';
}

LandkreisPfaffenhofen.type = 'news';

inherits(LandkreisPfaffenhofen, AbstractRssAdapter);

var proto = LandkreisPfaffenhofen.prototype;

proto.generalize = function(news) {
  var originalDescription = news.description;
  var parts = originalDescription.split('<span class="header_date">');
  var contentParts = parts[1].split('</span><span class="plain">');

  var tags = news.categories || [];
  tags = tags.concat(this.tags);

  var data = {
    type: this.getType(),
    title: this._sanitize(parts[0]),
    text: this._sanitize(contentParts[1]),
    date: new Date(news.pubDate),
    tags: tags,
    link: news.link,
    identifier: news.guid,
    adapter: this.id,
    author: 'admin'
  };

  return data;
};

module.exports = LandkreisPfaffenhofen;