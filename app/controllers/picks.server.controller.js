//File Name: ./app/controllers/picks.server.controller.js
var models = require('../models');

module.exports = function(){

  var _createPick = function(req,res){
    console.log(req.user);
    models.Pick.create({
      value   : req.body.value,
      game_id : req.body.game_id,
      UserId : req.user.id
    }).then(function(pick){
      console.log(pick);
    });
  };

  var _findPicks = function(req,res){
    models.Pick.findAll({

    }).then(function(picks){
      picks.forEach(log);
    });
  };

  return {
    createPick : _createPick,
    findPicks  : _findPicks
  };
}();
