var winston = require('winston');
var express = require('express');
var app = express();
var Database = require('./database');

function Api(config) {

  this._db = new Database();

  app.use(express.static('./build'));

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

  app.listen(config.port);
  winston.info('API listening on port', config.port);
}

module.exports = Api;
