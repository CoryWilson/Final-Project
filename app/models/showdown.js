//File Name: ./app/models/showdown.js

var mongoose = require('mongoose');

var showdownSchema = mongoose.Schema({

//a new showdown is created every week by the commissioner
//going to need a selection page
//commissioner will select games and push into this collection
//games to pick on will be given a reference that is passed into the api to bring down results
//this appropriate showdown will be served from the collection based on week
//aka week1 = showdown[0], week2 = showdown[1]

//users will be served from the users collection


  showdown : [{
    users                : {
      user1  : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
      user2  : { type : mongoose.Schema.Types.ObjectId, ref : 'User'}
    },
    games                : [{
      homeTeamName       : String,
      awayTeamName       : String,
      homeTeamScore      : Number,
      awayTeamScore      : Number,
      playerOnePick      : String,
      playerTwoPick      : String,
      playerOnePickValue : Number,
      playerTwoPickValue : Number,
      kickoff            : Date
    }],
    winner               : String
  }]


});

module.exports = mongoose.model('Showdown', showdownSchema);
