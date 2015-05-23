var r = require('rethinkdb');
var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');

function PccaddieHandler() {
  AbstractHandler.apply(this);
  this._table = 'pccaddie';
}

inherits(PccaddieHandler, AbstractHandler);

var proto = PccaddieHandler.prototype;

proto.save = function(timetable, callback) {
  var table = this._table;
  r.connect(this._options, function(err, conn) {
    if(err) {
      throw new Error(err);
    }
    r.table(table).insert(timetable, {conflict: 'replace'}).run(conn, function(err) {
      conn.close();
      callback(err, {});
    });
  });
};

module.exports = PccaddieHandler;
