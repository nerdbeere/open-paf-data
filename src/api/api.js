var winston = require('winston');
var express = require('express');
var app = express();
var Database = require('./database');

function Api(config) {

  this._db = new Database();

  app.disable('x-powered-by');

  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  };

  app.use(express.static('./build'));
  app.use(allowCrossDomain);

  app.get('/news', function (req, res) {
    this._db.getLatest({
      table: 'news',
      limitTo: 25,
      orderBy: 'date'
    }, function(err, result) {
      res.json(result);
    });
  }.bind(this));

  app.get('/social', function (req, res) {
    this._db.getLatest({
      table: 'social',
      limitTo: 25,
      orderBy: 'date'
    }, function(err, result) {
      res.json(result);
    });
  }.bind(this));

  app.get('/search_results', function (req, res) {
    this._db.getLatest({
      table: 'search',
      limitTo: 25,
      orderBy: 'created'
    }, function(err, result) {
      res.json(result);
    });
  }.bind(this));

  app.get('/gcr_teetime', function (req, res) {
    this._db.getLatest({
      table: 'pccaddie',
      limitTo: 1,
      orderBy: 'date'
    }, function(err, result) {
      res.json(result[0]);
    });
  }.bind(this));

  app.listen(config.port);
  winston.info('API listening on port', config.port);
}

module.exports = Api;
