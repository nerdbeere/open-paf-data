var config = require('../../../config/rethinkdb.js');

function Handler(r) {
  this._table = null;
  this._r = r;
}

var proto = Handler.prototype;

proto.save = function(newsArr, callback) {
  var callback = callback || function() {};
  var started = new Date().getTime();
  var table = this._table;
  var db = this._r.db(config.db);

  var done = 0;
  var docsInserted = 0;

  function isComplete(inserted) {
    done++;
    docsInserted += inserted;
    if (done === newsArr.length) {
      var finished = new Date().getTime();
      callback(null, {
        total: done,
        inserted: docsInserted,
        finished: finished,
        duration: finished - started
      });
    }
  }

  newsArr.forEach(function(news) {
    if (news === false) {
      return isComplete(0);
    }
    news.created = started;
    db.table(table).filter({identifier: news.identifier}).run(function(err, results) {
      if (err) throw err;
      if (results.length === 0) {
        db.table(table).insert(news).run(function() {
          isComplete(1);
        });
      } else {
        isComplete(0);
      }
    });
  });
};

module.exports = Handler;
