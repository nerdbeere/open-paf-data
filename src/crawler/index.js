var NewsHandler = require('./handler/news-handler');
var SearchHandler = require('./handler/search-handler');
var SocialHandler = require('./handler/social-handler');
var winston = require('winston');
var CronJob = require('cron').CronJob;

var adapters = [
  'landkreis-pfaffenhofen',
  'pafunddu',
  'pfaffenhofener-kurier',
  'google',
  'twitter'
];

function PafData() {
  this._handler = {
    news: new NewsHandler(),
    search: new SearchHandler(),
    social: new SocialHandler(),
  };

  this._adapters = [];
  this._jobQueue = [];
  this._crons = [];
  this._jobRunning = false;

  var that = this;
  (function loop() {
    setTimeout(loop, 1000);
    if (that._jobRunning) return;
    if (that._jobQueue.length === 0) return;

    that._jobRunning = true;

    var job = that._jobQueue.shift();
    job(function() {
      that._jobRunning = false;
    });
  })();

  this._connectAdapters();
}

var proto = PafData.prototype;

proto._connectAdapters = function() {
  adapters.forEach(function(adapterName) {
    var Adapter = require('./adapter/' + adapterName);
    var handler = this._handler[Adapter.type];
    var adapter = new Adapter(handler);
    this._adapters.push(adapter);
    this.schedule(adapter);
  }.bind(this));
};

proto.schedule = function(adapter) {
  winston.info(adapter.id, 'Scheduling job');
  this.addCrawlerJob(adapter);
  var job = new CronJob('*/10 * * * *', function() {
      this.addCrawlerJob(adapter);
    }.bind(this)
  );
  job.start();
  this._crons.push(job);
};

proto.addCrawlerJob = function(adapter) {
  winston.info(adapter.id, 'Added job to jobqueue');
  this._jobQueue.push(function(callback) {
    winston.info(adapter.id, 'Crawling started');
    adapter.crawl(function(err, data) {
      if (err) {
        winston.error(adapter.id, 'Crawling error', err);
      }
      winston.info(adapter.id, 'Crawling finished', 'inserted documents:', data.inserted);
      callback();
    });
  });
};

module.exports = PafData;