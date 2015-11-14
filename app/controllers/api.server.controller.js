//File Name: ./app/controllers/api.server.controller.js
var request = require('request');

module.exports = function(){

  var _readNFLAPI = function(req,res){

    //Get Current Date
    var currentDate = new Date();

    //NFL schedule
    //Set NFL Weeks in schedule

    //Week 1
    var week1Start   = new Date(2015,8,2);
    var week1End     = new Date(2015,8,14);
    var week1EndTime = new Date(week1End.getTime());
    week1EndTime.setDate(week1EndTime.getDate()+1);

    //Week 2
    var week2Start   = new Date(2015,8,15);
    var week2End     = new Date(2015,8,21);
    var week2EndTime = new Date(week2End.getTime());
    week2EndTime.setDate(week2EndTime.getDate()+1);

    //Week 3
    var week3Start   = new Date(2015,8,22);
    var week3End     = new Date(2015,8,28);
    var week3EndTime = new Date(week3End.getTime());
    week3EndTime.setDate(week3EndTime.getDate()+1);

    //Week 4
    var week4Start   = new Date(2015,8,29);
    var week4End     = new Date(2015,9,5);
    var week4EndTime = new Date(week4End.getTime());
    week4EndTime.setDate(week4EndTime.getDate()+1);

    //Week 5
    var week5Start   = new Date(2015,9,6);
    var week5End     = new Date(2015,9,12);
    var week5EndTime = new Date(week5End.getTime());
    week5EndTime.setDate(week5EndTime.getDate()+1);

    //Week 6
    var week6Start   = new Date(2015,9,13);
    var week6End     = new Date(2015,9,19);
    var week6EndTime = new Date(week6End.getTime());
    week6EndTime.setDate(week6EndTime.getDate()+1);

    //Week 7
    var week7Start   = new Date(2015,9,20);
    var week7End     = new Date(2015,9,26);
    var week7EndTime = new Date(week7End.getTime());
    week7EndTime.setDate(week7EndTime.getDate()+1);

    //Week 8
    var week8Start   = new Date(2015,9,27);
    var week8End     = new Date(2015,10,2);
    var week8EndTime = new Date(week8End.getTime());
    week8EndTime.setDate(week8EndTime.getDate()+1);

    //Week 9
    var week9Start   = new Date(2015,10,3);
    var week9End     = new Date(2015,10,9);
    var week9EndTime = new Date(week9End.getTime());
    week9EndTime.setDate(week9EndTime.getDate()+1);

    //Week 10
    var week10Start   = new Date(2015,10,10);
    var week10End     = new Date(2015,10,16);
    var week10EndTime = new Date(week10End.getTime());
    week10EndTime.setDate(week10EndTime.getDate()+1);

    //Week 11
    var week11Start   = new Date(2015,10,17);
    var week11End     = new Date(2015,10,23);
    var week11EndTime = new Date(week11End.getTime());
    week11EndTime.setDate(week11EndTime.getDate()+1);

    //Week 12
    var week12Start   = new Date(2015,10,24);
    var week12End     = new Date(2015,10,30);
    var week12EndTime = new Date(week12End.getTime());
    week12EndTime.setDate(week12EndTime.getDate()+1);

    //Week 13
    var week13Start   = new Date(2015,11,1);
    var week13End     = new Date(2015,11,7);
    var week13EndTime = new Date(week13End.getTime());
    week13EndTime.setDate(week13EndTime.getDate()+1);

    //Week 14
    var week14Start   = new Date(2015,11,8);
    var week14End     = new Date(2015,11,14);
    var week14EndTime = new Date(week14End.getTime());
    week14EndTime.setDate(week14EndTime.getDate()+1);

    //Week 15
    var week15Start   = new Date(2015,11,15);
    var week15End     = new Date(2015,11,21);
    var week15EndTime = new Date(week15End.getTime());
    week15EndTime.setDate(week15EndTime.getDate()+1);

    //Week 16
    var week16Start   = new Date(2015,11,22);
    var week16End     = new Date(2015,11,28);
    var week16EndTime = new Date(week16End.getTime());
    week16EndTime.setDate(week16EndTime.getDate()+1);

    //Week 17
    var week17Start   = new Date(2015,11,29);
    var week17End     = new Date(2016,0,3);
    var week17EndTime = new Date(week17End.getTime());
    week17EndTime.setDate(week17EndTime.getDate()+1);

    //Check to see if the current date falls within the nfl week
    //If it does then make the appropriate profootball api request
    if (currentDate >= week1Start && currentDate < week1EndTime){
      request
       .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=1&season_type=REG'},
         function(err, httpResponse, body){
           if(err){
             console.log(err);
           }
           res.send(body);
         }
      );
    } else if (currentDate >= week2Start && currentDate < week2EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=2&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if (currentDate >= week3Start && currentDate < week3EndTime){
      request
       .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=3&season_type=REG'},
         function(err, httpResponse, body){
           if(err){
             console.log(err);
           }
           res.send(body);
         }
      );
    } else if (currentDate >= week4Start && currentDate < week4EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=4&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if (currentDate >= week5Start && currentDate < week5EndTime){
      request
       .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=5&season_type=REG'},
         function(err, httpResponse, body){
           if(err){
             console.log(err);
           }
           res.send(body);
         }
      );
    } else if (currentDate >= week6Start && currentDate < week6EndTime){
      request
       .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=6&season_type=REG'},
         function(err, httpResponse, body){
           if(err){
             console.log(err);
           }
           res.send(body);
         }
      );
    } else if (currentDate >= week7Start && currentDate < week7EndTime){
      request
       .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=7&season_type=REG'},
         function(err, httpResponse, body){
           if(err){
             console.log(err);
           }
           res.send(body);
         }
      );
    } else if (currentDate >= week8Start && currentDate < week8EndTime){
      request
       .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=8&season_type=REG'},
         function(err, httpResponse, body){
           if(err){
             console.log(err);
           }
           res.send(body);
         }
      );
    } else if (currentDate >= week9Start && currentDate < week9EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=9&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if (currentDate >= week10Start && currentDate < week10EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=10&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if (currentDate >= week11Start && currentDate < week11EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=11&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if (currentDate >= week12Start && currentDate < week12EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=12&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if(currentDate >= week13Start && currentDate < week13EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=13&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if(currentDate >= week14Start && currentDate < week14EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=14&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if(currentDate >= week15Start && currentDate < week15EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=15&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if(currentDate >= week16Start && currentDate < week16EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=16&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else if(currentDate >= week17Start && currentDate < week17EndTime){
      request
        .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=17&season_type=REG'},
          function(err, httpResponse, body){
            if(err){
              console.log(err);
            }
            res.send(body);
          }
      );
    } else {
      res.json('It\'s the offseason! Come back next year!');
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
