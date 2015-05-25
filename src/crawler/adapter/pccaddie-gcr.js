var AbstractAdapter = require('./abstract-adapter');
var inherits = require('util').inherits;
var http = require('https');
var querystring = require('querystring');
var winston = require('winston');
var crypto = require('crypto');
var cheerio = require('cheerio');
var config = require('../../../config/pccaddie');

function PccaddieGcr(handler) {
  AbstractAdapter.apply(this);
  this.tags = ['gcr'];
  this.id = 'gcr';
  this._handler = handler;
  this.type = 'pccaddie';
  //this.debug = true;
}

PccaddieGcr.type = 'pccaddie';

inherits(PccaddieGcr, AbstractAdapter);

var proto = PccaddieGcr.prototype;
var proto = PccaddieGcr.prototype;

proto.crawl = function(callback) {

  var sanitze = this._sanitize;
  var account = config.accounts[0];
  var that = this;

  var postData = querystring.stringify({
    cat: 'timetable',
    service: 'login',
    'rq[login_name]': account.email,
    'rq[login_password]': account.password
  });

  var options = {
    hostname: 'www.pccaddie.net',
    port: 443,
    path: '/clubs/0498856/teetimes.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var body = '';

  function parseDate(selector) {
    var dateParts = selector.text()
      .split('-')[0]
      .trim()
      .split('.');

    var day = dateParts[0];
    var month = dateParts[1];
    var year = dateParts[2];

    return new Date(year + '-' + month + '-' + day);
  }

  function parse() {
    var $ = cheerio.load(body);

    var data = {
      date: parseDate($('#pcco-timetable-selection-date option:selected')),
      timeslots: []
    };

    var shasum = crypto.createHash('sha1');
    shasum.update(data.date.toString());
    data.id = shasum.digest('hex');

    $('#pcco-timetable .pcco-timetable-line').each(function() {
      var $timeslot = $(this);
      var time = $timeslot.children('.pcco-timetable-time').text();
      var timeslot = {
        time: time,
        slots: []
      };

      $timeslot.find('.pcco-timetable-slot').each(function() {
        var $slot = $(this);
        var $playerInfo = $slot.find('.pcco-tooltip');

        if(!$playerInfo || $playerInfo.length === 0) {
          return;
        }

        var hcp = $playerInfo.find('.hcp').text();
        var slotText = sanitze($playerInfo.find('.pcco-timetable-slot-text').text());
        var info = sanitze($playerInfo.find('.pcco-tooltip-display').text());
        var name = null;
        var playerType = null;

        // check if slot is reserved for some reason
        if(slotText) {
          timeslot.slots.push({
            reserved: true,
            text: slotText
          });
          return;
        }

        // remove handicap from info
        info = info.replace(hcp, '');

        // split name and player type
        var parts = info.split('-');

        // check if name is supplied
        if(parts.length === 2) {
          var nameParts = parts.shift().split(',');
          name = {
            firstname: nameParts[1].trim(),
            lastname: nameParts[0].trim()
          };
        }

        // check if there is the player type left
        if(parts.length === 1) {
          playerType = parts[0].trim();
        }

        // optimize handicap
        hcp = hcp.replace('(', '');
        hcp = hcp.replace(')', '');
        hcp = parseFloat(hcp.replace(',', '.'));

        if(isNaN(hcp)) {
          hcp = null;
        }

        timeslot.slots.push({
          hcp: hcp,
          playerType: playerType,
          name: name
        });
      });

      data.timeslots.push(timeslot);
    });

    return data;
  }

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var timetable = parse();
      that._save(timetable, callback);
    });
  });

  req.on('error', function(e) {
    winston.error('problem with request: ' + e.message);
  });

  req.write(postData);
  req.end();

};

module.exports = PccaddieGcr;
