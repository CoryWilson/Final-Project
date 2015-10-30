process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config   = require('./config/config'),
  	mongoose = require('./config/mongoose'),
  	express  = require('./config/express'),
  	passport = require('./config/passport');

var db       = mongoose(),
  	app      = express(),
  	passport = passport();

var server   = app.listen(config.port);

var io = require('socket.io').listen(server);

module.exports = app;
