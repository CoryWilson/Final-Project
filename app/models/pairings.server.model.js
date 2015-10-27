//File Name: ./app/models/pairings.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var pairingsSchema = new Schema([
  {
    league: String,
    week : Number,
    user1 : {
      type: Schema.ObjectId,
      ref: 'User'
    },
    user2 : {
      type: Schema.ObjectId,
      ref: 'User'
    }
  }
]);

module.exports = mongoose.model('Pairings', pairingsSchema);
