var r = require('rethinkdbdash');
var config = require('../../config/rethinkdb');

function Database() {
  this._r = r(config);
  this._cache = {};
  this._cacheTime = 1000 * 60 * 5;
}

var proto = Database.prototype;

proto.getLatest = function(opts, callback) {
  var result = this._getFromCache(opts);
  if(result) {
    return callback(null, result);
  }
  this._r.db(config.db).table(opts.table)
    .orderBy(this._r.desc(opts.orderBy))
    .limit(opts.limitTo)
    .run(function(err, data) {
      if(err) {
        return callback(err, data);
      }

      this._createCacheItem(opts, data);
      return callback(err, data);
    }.bind(this));
};

proto._createCacheItem = function(opts, data) {
  var key = this._buildCacheKey(opts);
  this._cache[key] = {
    data: data,
    created: new Date().getTime()
  };
};

proto._getFromCache = function(opts) {
  var key = this._buildCacheKey(opts);
  var cacheItem = this._cache[key];
  var now = new Date().getTime();
  if(!cacheItem) {
    return null;
  }
  if(cacheItem.created < now - this._cacheTime) {
    return null;
  }

  return cacheItem.data;
};

proto._buildCacheKey = function(obj) {
  var str = '';
  Object.keys(obj).forEach(function(key) {
    str += key + obj[key];
  });
  return str;
};

module.exports = Database;
