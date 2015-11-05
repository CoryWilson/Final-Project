//File Name: ./app/models/league.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

showdownSchema = new Schema({
  showdowns : [{
    league_id  : {
      type: Schema.ObjectId,
      ref: 'League'
    },
    week        : Number,
    showdownNum : Number,
    competitors : [{
      user_id : {
        type: Schema.ObjectId,
        ref: 'User'
      }
    }],
    games   : [{
      gameInfo : {
        homeTeamName  : String,
        homeTeamScore : Number,
        awayTeamName  : String,
        awayTeamScore : Number,
        location      : String,
        status        : String,
        date          : Date
      },
      selections : [{
        pick : {
          team  : String
          //value : Number
        },
        user_id : {
          type: Schema.ObjectId,
          ref: 'User'
        }
      }],
    }]
  }]
});


module.exports = mongoose.model('Showdown', showdownSchema);
