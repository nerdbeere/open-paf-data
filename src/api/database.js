var r = require('rethinkdbdash');
var config = require('../../config/rethinkdb');

function Database() {
  this._r = r();
}

var proto = Database.prototype;

proto.getLatest = function(opts, callback) {
  this._r.db(config.db).table(opts.table)
    .orderBy(this._r.desc(opts.orderBy))
    .limit(opts.limitTo)
    .run(callback);
};

module.exports = Database;
