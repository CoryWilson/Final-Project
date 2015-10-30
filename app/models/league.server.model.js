//File Name: ./app/models/league.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

leagueSchema = new Schema({
  name      : String,
  members   : [{
    user_id: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  }],
  showdowns : [{
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
          team  : Boolean,
          value : Number
        },
        user_id : {
          type: Schema.ObjectId,
          ref: 'User'
        }
      }],
    }]
  }],
  standings : {
    members : [{
      user_id: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      results : {
        wins      : {
          type : Number,
          default : 0
        },
        ties      : {
          type : Number,
          default : 0
        },
        losses    : {
          type : Number,
          default : 0
        },
        points    : {
          type : Number,
          default : 0
        }
      }
    }]
  }
});

module.exports = mongoose.model('League', leagueSchema);
