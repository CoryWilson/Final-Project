//File Name: ./app/controllers/game.server.controller.js
var models        = require('../models');
var request       = require('request');
var apiController = require('./api.server.controller');
module.exports = function(){

  var _createPick = function(req,res){
    models.Pick
      .findOrCreate({
        where: {
          game_id : req.body.game_id,
          value   : req.body.value,
          week    : req.body.week,
          UserId  : req.user.id
        }
      })
      .spread(function(user, pick){
        console.log(user);
        console.log(pick);
      })
      .error(function(err){
        console.log('Error creating pick: ',err);
      });
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
        res.json(games);
      });
  };

  return {
    createPick : _createPick,
    checkPicks : _checkPicks
  };
}();
