var apiConfig = require('./config/api');
var Crawler = require('./src/crawler/crawler.js');
var Api = require('./src/api/api.js');

new Crawler();
new Api(apiConfig);