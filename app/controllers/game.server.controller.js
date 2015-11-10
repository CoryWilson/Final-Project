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
    models.Pick
      .findAll({ //pull picks from current week
        where: {
          week : 10 //current week goes here
        }
      })
      .then(function(picks){
        //use the api to pull down the same week
        /*
        picks.forEach(function(data){//loop through picks
          //if api.home_team > api.away_team && pick === "home"
          // +1 point and create record
          //else if api.home_team < api.away_team && pick === "away"
          // +1 point and create record
          //else
          // +0 points and create record
          var game_id = JSON.stringify(data.game_id);
          console.log(game_id);
          request
            .post({url:'https://profootballapi.com/game?api_key='+process.env.NFL_API_KEY+'&game_id='+game_id},
              function(err, httpResponse, body){
                if(err){
                  console.log(err);
                }
                  console.log(body);
              }
          );
        });
        */
      });
  };

  return {
    createPick : _createPick,
    checkPicks : _checkPicks
  };
}();
