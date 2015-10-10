//File Name: ./app/models/standings.js

var mongoose = require('mongoose');

var leagueSchema = mongoose.Schema({

  league : String,
  users  : {
    type : mongoose.Schema.Types.ObjectId,
    ref  : 'User'
  }

});

module.exports = mongoose.model('League', leagueSchema);

var League = mongoose.model('League', leagueSchema);

League.find({})
  .populate('users')
  .exec(function(err,data){
    console.log(JSON.stringify(data));
  });
