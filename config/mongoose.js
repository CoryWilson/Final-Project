//File Name: ./config/mongoose.js

var config   = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);

  require('../app/models/user.server.model');
  require('../app/models/league.server.model');
  require('../app/models/week.server.model');
  require('../app/models/pairings.server.model');

  return db;
};
