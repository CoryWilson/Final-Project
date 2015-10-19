//File Name: ./app/models/showdown.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// var competitorSchema = new Schema({
//   type: Schema.ObjectId,
//   ref: 'User'
// });
//
// var gameSchema = new Schema({
//   gameInfo: {},
//   pick: Boolean,
//   value: Number
// });
//
// var weekSchema = new Schema({
//   competitors: [competitorSchema],
//   games : [gameSchema]
// });

var showdownSchema = new Schema({
  weeks: []//weekSchema]
});

module.exports = mongoose.model('Showdown', showdownSchema);
