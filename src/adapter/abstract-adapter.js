var sanitizeHtml = require('sanitize-html');

function AbstractAdapter() {
  this.url = null;
}

var proto = AbstractAdapter.prototype;

proto._sanitize = function(str) {
  return sanitizeHtml(str, {
    allowedTags: []
  });
};

proto.crawl = function() {
  throw new Error('Function `crawl` not implemented')
};

proto.getType = function() {
  if(!this.type) {
    throw new Error('Adapter type is not defined');
  }
  return this.type;
};

proto._save = function(data, callback) {
  if(this.debug === true) {
    console.log(data);
    return callback(null, data);
  }
  this._handler.save(data, callback);
};

module.exports = AbstractAdapter;