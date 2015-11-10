//File Name: ./app/controllers/game.server.controller.js
var models        = require('../models');
var request       = require('request');
var apiController = require('./api.server.controller');
module.exports = function(){

  var _createPick = function(req,res){
    models.Pick
      .create({
        value   : req.body.value,
        game_id : req.body.game_id,
        UserId  : req.user.id
      })
      .then(function(pick){});
  };

  //check picks
  //pull from db
  //pull from api
  //check if home_score > away_score && pick === "home"
  //create record with +1 point referencing game_id & user_id
  var _readNFLGame = function(game_id){
    request
      .post({url:'https://profootballapi.com/game?api_key='+process.env.NFL_API_KEY+'&game_id='+game_id},
        function(err, httpResponse, body){
          if(err){
            console.log('Error: ',err);
          }
            return JSON.stringify(body);
        }
    );
  };

  var _checkPicks = function(req, res){
    models.Pick
      .findAll({})
      .then(function(games){
        //var points = 0;

        games.forEach(console.log(_readNFLGame(games.game_id)));


        // models.Record
        //   .create({
        //     game_id : game.game_id,
        //     points  : points,
        //     UserId  : req.user.id
        //   })
        //   .then(function(record){});
      });
  };

  return {
    createPick : _createPick,
    checkPicks : _checkPicks
  };
}();
