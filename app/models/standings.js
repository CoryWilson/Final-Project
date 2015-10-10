//File Name: ./app/models/standings.js
var mongoose = require('mongoose');

var standingsSchema = mongoose.Schema({

  users    : [{ type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
  position : Number,
  wins     : Number,
  ties     : Number,
  losses   : Number,
  points   : Number

});

module.exports = mongoose.model('Standings', standingsSchema);
