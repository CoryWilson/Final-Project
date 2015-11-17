//File Name: ./app/controllers/api.server.controller.js
var moment  = require('moment'),
    request = require('request');

module.exports = function(){

  var _readNFLAPI = function(req,res){
    //NFL schedule
    //Set NFL Weeks in schedule
    var week1 = moment().isBetween('2015-09-02','2015-09-14');
    var week2 = moment().isBetween('2015-09-15','2015-09-21');
    var week3 = moment().isBetween('2015-09-22','2015-09-28');
    var week4 = moment().isBetween('2015-09-29','2015-10-05');
    var week5 = moment().isBetween('2015-10-06','2015-10-12');
    var week6 = moment().isBetween('2015-10-13','2015-10-19');
    var week7 = moment().isBetween('2015-10-20','2015-10-26');
    var week8 = moment().isBetween('2015-10-27','2015-11-02');
    var week9 = moment().isBetween('2015-11-03','2015-11-09');
    var week10 = moment().isBetween('2015-11-10','2015-11-16');
    var week11 = moment().isBetween('2015-11-17','2015-11-23');
    var week12 = moment().isBetween('2015-11-24','2015-11-30');
    var week13 = moment().isBetween('2015-12-01','2015-12-07');
    var week14 = moment().isBetween('2015-12-08','2015-12-14');
    var week15 = moment().isBetween('2015-12-15','2015-12-21');
    var week16 = moment().isBetween('2015-12-22','2015-12-28');
    var week17 = moment().isBetween('2015-12-29','2015-01-03');

    var schedule = [
      week1,
      week2,
      week3,
      week4,
      week5,
      week6,
      week7,
      week8,
      week9,
      week10,
      week11,
      week12,
      week13,
      week14,
      week15,
      week16,
      week17
    ];

    for (var i = 0; i < schedule.length; i++) {
      var weekNum = i+1;
      if (schedule[i] === true) {
        request
         .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week='+weekNum+'&season_type=REG'},
           function(err, httpResponse, body){
             if(err){
               console.log(err);
             }
             res.send(body);
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
