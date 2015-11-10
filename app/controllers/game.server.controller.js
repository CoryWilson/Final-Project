//File Name: ./app/controllers/game.server.controller.js
var models = require('../models');

module.exports = function(){

  var _createPick = function(req,res){
    models.Pick
      .create({
        value   : req.body.value,
        game_id : req.body.game_id,
        UserId : req.user.id
      })
      .then(function(pick){});
  };

  return {
    createPick : _createPick
  };
}();
