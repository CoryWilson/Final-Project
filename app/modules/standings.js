//File Name: ./app/modules/models.js

var Standings = require('../models/standings.js');

exports.findStandings = function(standings){

  Standings.find({})
    .populate('users')
    .exec(function(err,data){
      console.log(JSON.stringify(data));
    });

};
