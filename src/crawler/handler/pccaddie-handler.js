var inherits = require('util').inherits;
var AbstractHandler = require('./abstract-handler');
var config = require('../../../config/rethinkdb.js');

function PccaddieHandler(r) {
  AbstractHandler.apply(this, arguments);
  this._table = 'pccaddie';
}

inherits(PccaddieHandler, AbstractHandler);

var proto = PccaddieHandler.prototype;

proto.save = function(timetable, callback) {
  var table = this._table;
  this._r.db(config.db).table(table).insert(timetable, {conflict: 'replace'}).run(function(err) {
    callback(err, {});
  });
};

module.exports = PccaddieHandler;
