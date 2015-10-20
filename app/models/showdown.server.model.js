//File Name: ./app/models/showdown.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var gameSchema = new Schema({
  gameInfo : {
    homeTeamName  : String,
    homeTeamScore : Number,
    awayTeamName  : String,
    awayTeamScore : Number,
    location      : String,
    status        : String,
    date          : Date
  },
  pick  : String,
  value : Number
});

var showdownSchema = new Schema({
  games : [gameSchema],
  week  : Number
});

module.exports = mongoose.model('Showdown', showdownSchema);
