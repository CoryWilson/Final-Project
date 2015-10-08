//File Name: ./app/models/league.js

var mongoose = require('mongoose');

var showdownSchema = mongoose.Schema({

  league         : {

    commissioner : String,
    
    players      : [
      {
        name     : String,
        position : Number
      }
    ]
  }

});

module.exports = mongoose.model('League', leagueSchema);
