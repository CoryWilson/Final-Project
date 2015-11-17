//File Name: ./app/controllers/api.server.controller.js
var moment   = require('moment'),
    schedule = require('../../config/schedule'),
    request  = require('request');

module.exports = function(){

  var _readNFLAPI = function(req,res){
    //NFL schedule
    var gameArray = [];

    for (var i = 0; i < schedule.length; i++) {
      var weekNum = i+1;
      var url = 'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week='+weekNum+'&season_type=REG';
      if (schedule[i] === true) {
        request
         .post({url:url},
           function(err, httpResponse, body){
            var data = JSON.parse(body);
            for (var j = 0; j < data.length; j++) {
              var game        = data[j];
              var id          = game.id;
              var home        = game.home;
              var away        = game.away;
              var day         = moment.unix(game.time).format('ddd');
              var date        = moment.unix(game.time).format('MMM D');
              var time        = moment.unix(game.time).format('h:mm a');
              var week        = game.week;
              var season_type = game.season_type;
              var final       = game.final;
              var home_score  = game.home_score;
              var away_score  = game.away_score;
              gameArray.push({id:id,home:home,away:away,day:day,date:date,time:time,week:week,season_type:season_type,final:final,home_score:home_score,away_score:away_score});
            }
            res.json(gameArray);
          }
        );
      }
    }
  };

  var _readNFLGame = function(req, res){
    //doesn't send a game until it happens
    request
      .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=10&season=REG'},
        function(err, httpResponse, body){
          if(err){
            console.log(err);
          }
          var data = JSON.parse(body);
          var game_id = Number(req.params.game_id);
          var points = 0;
          for (var i = 0; i < data.length; i++) {
            if(data[i].id === game_id){
              if(data[i].home_score > data[i].away_score){
                points++;
                console.log(data[i].home,' wins! User chose correctly!');
                console.log('User gets ',points, ' points!');
              }
              if(data[i].home_score < data[i].away_score){
                points++;
                console.log(data[i].away,' wins! User chose correctly!');
                console.log('User gets ',points, 'points!');
              }
              res.send(data[i]);
            }
          }
        }
    );
  };

  var _readSoccerAPI = function(req,res){
    var options = {
      url : 'http://api.football-data.org/alpha/soccerseasons/398/fixtures?matchday='+req.params.week,
      headers : {
        'X-Auth-Token' : process.env.SOCCER_API_KEY
      }
    };
    request
      .get(options,
        function(err, httpResponse, body){
          if(err){
            return console.log(err);
          }
          res.send(body);
        }
    );
  };

  return {
    readNFLAPI    : _readNFLAPI,
    readNFLGame   : _readNFLGame,
    readSoccerAPI : _readSoccerAPI
  };
}();
