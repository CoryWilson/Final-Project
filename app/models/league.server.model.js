//File Name: ./app/models/league.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


memberSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

gameSchema = new Schema({
  gameInfo : {
    homeTeamName  : String,
    homeTeamScore : Number,
    awayTeamName  : String,
    awayTeamScore : Number,
    location      : String,
    status        : String,
    date          : Date
  },
  member : [
    memberSchema,
    {
      pick  : Boolean,
      value : Number
    }
  ]
});

resultsSchema = new Schema({

    members : [
      memberSchema,
      {
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
    ]
  }
);

leagueSchema = new Schema({
  name      : String,
  members   : [memberSchema],
  showdowns : [{
    week    : Number,
    games   : [gameSchema]
  }],
  results   : [resultsSchema]
});

module.exports = mongoose.model('League', leagueSchema);
