var r = require('rethinkdb');
var config = require('../../config/rethinkdb.js');

function Handler() {
  this._options = config;

  this._table = null;
}

var proto = Handler.prototype;

proto.save = function(newsArr, callback) {
  var callback = callback || function() {};
  var started = new Date().getTime();
  var table = this._table;
  r.connect(this._options, function(err, conn) {

    var done = 0;
    var docsInserted = 0;
    function isComplete(inserted) {
      done++;
      docsInserted += inserted;
      if(done === newsArr.length) {
        var finished = new Date().getTime();
        conn.close();
        callback(null, {
          total: done,
          inserted: docsInserted,
          finished: finished,
          duration: finished - started
        });
      }
    }

    newsArr.forEach(function(news) {
      if(news === false) {
        return isComplete(0);
      }
      news.created = started;
      r.table(table).filter({identifier: news.identifier}).run(conn, function(err, cursor) {
        cursor.toArray(function(err, results) {
          if (err) throw err;
          if(results.length === 0) {
            r.table(table).insert(news).run(conn, function() {
              isComplete(1);
            });
          } else {
            isComplete(0);
          }
        });
      });
    });
  });
};

module.exports = Handler;