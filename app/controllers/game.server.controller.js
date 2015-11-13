//File Name: ./app/controllers/game.server.controller.js
var models        = require('../models');
var request       = require('request');
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
      var points = 0; //Declare the points that will be allocated to user picks
      models.Pick
        .findAll({
          where : {
            week : 10
          }
        })
        .then(function(data){
          //make one api request
          request
            .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=10&season=REG'},
              function(err, httpResponse, schedule){
            data.forEach(function(picks){ //looping through the picks
              var value = picks.value; //users pick value
              var game_id = Number(picks.game_id); //getting the game_id of the pick and setting it to a number
              var user_id = Number(picks.UserId); //getting the user id
              if(err){
                console.log(err);
              }
              var games = JSON.parse(schedule); //parse results

              for (var i = 0; i < games.length; i++) { //loop through the games returned
                if(games[i].id === game_id){ // check to see if the returned game from the schedule matches the game the user picked on
                  if(games[i].home_score > games[i].away_score && value === "home"){
                    points = points + 1;

                    console.log(games[i].home,' wins! User ',user_id,' chose correctly!');
                    console.log('User ',user_id,' gets ',points, ' points!');

                    models.Record
                      .findOrCreate({ //checks for record and if it doesn't exist it adds it
                        where : {
                          game_id : game_id,
                          points  : points,
                          UserId  : user_id
                        }
                      })
                      .spread(function(user, record){
                        if(record === true){
                          console.log('Record added.');
                        } else {
                          console.log('A record already exists for this game.');
                        }
                      })
                      .error(function(err){
                        console.log('Error creating record: ',err);
                      });
                  }
                   else if(games[i].home_score < games[i].away_score && value === "away"){
                    points = points + 1;

                    console.log(games[i].away,' wins! User ',user_id,' chose correctly!');
                    console.log('User ',user_id,' gets ',points, 'points!');

                    models.Record
                      .findOrCreate({ //checks for record and if it doesn't exist it adds it
                        where : {
                          game_id : game_id,
                          points  : points,
                          UserId  : user_id
                        }
                      })
                      .spread(function(user, record){
                        if(record === true){
                          console.log('Record added.');
                        } else {
                          console.log('A record already exists for this game.');
                        }
                      })
                      .error(function(err){
                        console.log('Error creating record: ',err);
                      });

                  }
                  else {
                    console.log('User ',user_id,' chose incorrectly!');
                    console.log('User ',user_id,' gets ',points, 'points!');

                    models.Record
                      .findOrCreate({ //checks for record and if it doesn't exist it adds it
                        where : {
                          game_id : game_id,
                          points  : points,
                          UserId  : user_id
                        }
                      })
                      .spread(function(user, record){
                        if(record === true){
                          console.log('Record added.');
                        } else {
                          console.log('A record already exists for this game.');
                        }
                      })
                      .error(function(err){
                        console.log('Error creating record: ',err);
                      });
                  }
                }
              }


            });//end data.forEach
          });//end request



        });
  };

  return {
    createPick : _createPick,
    checkPicks : _checkPicks
  };
}();
