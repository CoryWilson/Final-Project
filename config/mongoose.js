//File Name: ./config/mongoose.js

var config   = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);

  require('../app/models/user.server.model');
  require('../app/models/showdownSelection.server.model');
  require('../app/models/standings.server.model');

  return db;
};
