//File Name: ./app/models/showdown.js

var mongoose = require('mongoose');

var showdownSchema = mongoose.Schema({

  showdown : {
    players : {
      one : String,
      two : String
    },
    games : [
      {
        homeTeamName       : String,
        awayTeamName       : String,
        homeTeamScore      : String,
        awayTeamScore      : String,
        playerOnePick      : String,
        playerTwoPick      : String,
        playerOnePickValue : String,
        playerTwoPickValue : String
      }
    ]
  }

});

module.exports = mongoose.model('Showdown', showdownSchema);
