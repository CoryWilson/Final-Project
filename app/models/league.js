//File Name: ./app/models/league.js

var mongoose = require('mongoose');

var showdownSchema = mongoose.Schema({

  league : {
    players  : [
      {
        name : String
      }
    ]
  }

});

module.exports = mongoose.model('League', leagueSchema);
