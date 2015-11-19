//File Name: ./app/controllers/game.server.controller.js
var models        = require('../models'),
    moment        = require('moment'),
    FB            = require('fb');

module.exports = function(){

  var _createPick = function(req,res){
    var currentTime = moment(); //get current time
    var gameTime = moment.unix(req.body.unix); //get time of game start

    if(moment(currentTime).isAfter(gameTime) === true){ //check if the game has already started
      console.log('you can\'t pick after the game has started'); //don't allow user to make a pick if the game has started
    } else {
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
    }
  };

  var _getFriendsRecord = function(req, res){
    FB.setAccessToken(req.user.access_token);

    FB.api(//get user's friends
      'me',
      {fields : [
        'first_name',
        'last_name',
        'name',
        'picture.width(500).height(500)',
        'friends{id,first_name,last_name,name,picture.width(500).height(500),favorite_teams}'
      ]},
      function (response) {
        if (response && !response.error) {
          var friendsArray = []; //friendsArray
          var fb_id = req.user.facebook_id; //get user fb_id
          friendsArray.push(fb_id); //place it in friends array
          if(response.friends){
            var friends = response.friends.data;
            for (var i = 0; i < friends.length; i++) {
              friendsArray.push(friends[i].id); //push facebook id's into friendsArray
            }
          }
            models.Record.findAll({//find all the records of users who are facebook friends
              include : [{
                model : models.User,
                where : {
                  facebook_id :{
                    $in : friendsArray
                  }
                }
              }],
              order : 'points DESC'
            })
            .then(function(list){
              var players = [];
              list.forEach(function(data){
                for (var i = 0; i < friends.length; i++) {
                  if(response.id === data.User.facebook_id){
                    players.push({db: data, fb: response});
                  }
                  if (friends[i].id === data.User.facebook_id){
                    players.push({db: data, fb: friends[i]});
                  }
                }
              });
              res.json(players);
            });
        }
      });
  };




  return {
    createPick        : _createPick,
    // updateRecord      : _updateRecord,
    getFriendsRecord  : _getFriendsRecord
  };
}();
