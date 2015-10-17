//File Name: ./app/models/game.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var weekSchema = new Schema ({
  creator : {
    type: Schema.ObjectId,
    ref: 'User'
  },
  weekNum : String,
  games   : []
});

module.exports = mongoose.model('Week', weekSchema);
