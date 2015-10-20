var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var eplSchema = new Schema({

  fixtures          : [{
    date            : String,
    status          : String,
    matchday        : String,
    homeTeamName    : String,
    awayTeamName    : String,
    result          : {
      goalsHomeTeam : Number,
      goalsAwayTeam : Number
    }
  }]

});

module.exports = mongoose.model('EPL', eplSchema);
