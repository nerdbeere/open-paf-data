var config = require('../../../config/rethinkdb.js');
var winston = require('winston');

function Handler(r) {
  this._table = null;
  this._r = r;
}

var proto = Handler.prototype;

proto.save = function(newsArr, callback) {
  var callback = callback || function() {};
  var table = this._table;
  var db = this._r.db(config.db);

  db.table(table).run(function(err, results) {
    var identifiers = [];

    if(err) {
      callback(err, null);
      return;
    }

    results.forEach(function(news) {
      identifiers.push(news.identifier);
    });

    var total = newsArr.length;
    var docsInserted = 0;

    newsArr.forEach(function(news) {
      if(!news) return;
      if(identifiers.indexOf(news.identifier) !== -1) return;

      db.table(table).insert(news).run(function() {
        docsInserted++;
      });
    });

    callback(null, {
      total: total,
      inserted: docsInserted
    });
  });
};

module.exports = Handler;
