var AbstractAdapter = require('./abstract-adapter');
var inherits = require('util').inherits;
var crypto = require('crypto');
var twitterConfig = require('../../../config/twitter');
var TwitterLib = require('twitter');
var winston = require('winston');

function Twitter(handler) {
  AbstractAdapter.apply(this);
  this.tags = ['twitter'];
  this.id = 'twitter';
  this._handler = handler;
  this.type = 'social';
  //this.debug = true;
}

Twitter.type = 'social';

inherits(Twitter, AbstractAdapter);

var proto = Twitter.prototype;

proto.generalize = function(tweet) {

  var tags = this.tags.concat(tweet.entities.hashtags.map(function(hashtag) {
    return hashtag.text;
  }));

  return {
    identifier: tweet.id_str,
    text: tweet.text,
    date: new Date(tweet.created_at),
    source: this._sanitize(tweet.source),
    tags: tags,
    urls: tweet.entities.urls.map(function(url) {
      return url.url
    }),
    user_mentions: tweet.entities.user_mentions.map(function(mention) {
      return mention.screen_name;
    }),
    geo: tweet.geo,
    author: {
      name: tweet.user.name,
      screen_name: tweet.user.screen_name,
      url: tweet.user.url
    }
  };
};

proto.crawl = function(callback) {
  var client = new TwitterLib(twitterConfig);

  var that = this;
  var params = {q: 'pfaffenhofen', lang: 'de', count: 100};
  client.get('search/tweets', params, function(error, tweets, response){
    if(error) {
      winston.error(that.id, error);
    }
    var unifiedData = tweets.statuses.map(that.generalize.bind(that));
    that._save(unifiedData, callback)
  });
};

module.exports = Twitter;