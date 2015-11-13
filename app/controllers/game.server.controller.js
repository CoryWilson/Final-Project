//File Name: ./app/controllers/game.server.controller.js
var models        = require('../models');
var apiController = require('./api.server.controller');

module.exports = function(){

  var _createPick = function(req,res){
    models.Pick
      .findOrCreate({ //check the pick table to see if the pick exists with these parameters and if it doesn't exist it will create that pick
        where: {
          game_id : req.body.game_id,
          value   : req.body.value,
          week    : req.body.week,
          UserId  : req.user.id
        }
      })
      .spread(function(user, pick){
        if(pick === true){
          console.log('Pick added.');
        } else {
          console.log('A pick already exists for this game.');
        }
      })
      .error(function(err){
        console.log('Error creating pick: ',err);
      });
  };

  //check if home_score > away_score && pick === "home"
  //create record with +1 point referencing game_id & user_id
  var _checkPicks = function(req, res){
    
  };

  return {
    createPick : _createPick,
    checkPicks : _checkPicks
  };
}();
