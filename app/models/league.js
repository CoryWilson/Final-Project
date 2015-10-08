//File Name: ./app/models/league.js

var mongoose = require('mongoose');

var showdownSchema = mongoose.Schema({

  league         : {

    players      : [
      {
        _id      : String,
        name     : String,
        position : Number
      }
    ]
  }

});

module.exports = mongoose.model('League', leagueSchema);
