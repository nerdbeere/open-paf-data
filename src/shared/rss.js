var FeedParser = require('feedparser');
var request = require('request');

function Rss(url, callback) {

  var feedparser = new FeedParser([{
    normalize: false,
    addmeta: false
  }]);

  var req = request(url);

  req.on('error', function(error) {
    // handle any request errors
  });
  req.on('response', function(res) {
    var stream = this;

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    // always handle errors
  });

  var items = [];
  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this;
    var meta = this.meta;
    var item;

    while (item = stream.read()) {
      items.push(item);
    }
  });

  feedparser.on('end', function() {
    callback(null, items);
  });
}

module.exports = Rss;