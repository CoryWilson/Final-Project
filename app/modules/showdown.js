//File Name: ./app/modules/showdown.js

var Showdown = require('../models/showdown.js');

exports.findShowdowns = function(showdowns){
  Showdown.find({})
    .populate('user1')
    .populate('user2')
    .exec(function(err,data){
      console.log(JSON.stringify(data));
    });
};
