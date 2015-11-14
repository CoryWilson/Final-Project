//File Name: ./app/controllers/game.server.controller.js
var models        = require('../models'),
    request       = require('request'),
    FB            = require('fb');

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
  var _updateRecord = function(req, res){
    models.Pick
      .findAll({
        where : {
          week : 10 //current week
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

                  models.Record
                    .findOne({
                      where : {
                        UserId : user_id
                      }
                    })
                    .then(function(record){
                      record.increment('points', {by:1});
                    })
                    .error(function(err){
                      console.log('Error updating record: ',err);
                    });
                }
                 else if(games[i].home_score < games[i].away_score && value === "away"){

                  models.Record
                    .findOne({
                      where : {
                        UserId : user_id
                      }
                    })
                    .then(function(record){
                      record.increment('points', {by:1});
                    })
                    .error(function(err){
                      console.log('Error updating record: ',err);
                    });
                }
                else {
                  models.Record
                    .findOne({
                      where : {
                        UserId : user_id
                      }
                    })
                    .then(function(record){
                      record.increment('points', {by:0});
                    })
                    .error(function(err){
                      console.log('Error updating record: ',err);
                    });
                }
              }
            }
          });//end data.forEach
        });//end request
      });
  }; //end _createRecord

  var _getFriendsRecord = function(req, res){
    FB.setAccessToken(req.user.access_token);

    FB.api(//get user's friends
      'me',
      {fields : [
        'friends{id,first_name,last_name,name,picture.width(500).height(500),favorite_teams}'
      ]},
      function (response) {
        var friends = response.friends.data;
        var friendsArray = []; //friendsArray
        for (var i = 0; i < friends.length; i++) {
          friendsArray.push(friends[i].id); //push facebook id's into friendsArray
        }
        if (response && !response.error) {
          models.Record.findAll({//find all the records of users who are facebook friends
            include : [{
              model : models.User,
              where : {
                facebook_id :{
                  $in : friendsArray
                }
              }
            }],
            order : 'UserId ASC'
          })
          .then(function(list){
            res.json(list);
          });
        }
      });
  };




  return {
    createPick        : _createPick,
    updateRecord      : _updateRecord,
    getFriendsRecord  : _getFriendsRecord
  };
}();
