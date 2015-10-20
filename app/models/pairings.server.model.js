//File Name: ./app/models/pairings.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var pairingsSchema = new Schema({
  league: String,
  weeks : []
});

module.exports = mongoose.model('Pairings', pairingsSchema);
