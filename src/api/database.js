var r = require('rethinkdb');
var config = require('../../config/rethinkdb');

function Database() {

}

var proto = Database.prototype;

proto.getLatest = function(opts, callback) {
  r.connect(config, function(err, conn) {
    r.table(opts.table).orderBy(r.desc(opts.orderBy)).limit(opts.limitTo).run(conn, function(err, cursor) {
      cursor.toArray(callback);
    });
  });
};

module.exports = Database;