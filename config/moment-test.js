var moment = require('moment');
var models = require('../app/models');
var request = require('request');
var schedule = require('./schedule');


function checkWeek(week){
  if(week.weekTest === true){
    models.Pick
      .findAll({
        where :{
          week : week.weekNum
        }
      })
      .then(function(data){
        var url = 'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week='+week.weekNum+'&season=REG';
        data.forEach(function(picks){
          request
            .post({url:url},function(err, httpResponse, results){
              var value = picks.value; //users pick value
              var pickGameId = Number(picks.game_id); //getting the game_id of the pick and setting it to a number
              var userId = Number(picks.UserId); //getting the user id
              var games = JSON.parse(results); //parse results

              for (var j = 0; j < games.length; j++) { //loop through api schedule
                var apiGameId = Number(games[j].id);
                if(pickGameId === apiGameId){
                  console.log('api game id:',apiGameId);
                  console.log('pick game id:',pickGameId);
                  console.log('pick user id:',userId);


                  if(apiGameId.home_score > apiGameId.away_score && value === "home"){

                    models.Record
                      .findOne({
                        where : {
                          UserId : userId
                        }
                      })
                      .then(function(record){
                        record.increment('points', {by:1});
                      });
                  }
                   else if(apiGameId.home_score < apiGameId.away_score && value === "away"){

                    models.Record
                      .findOne({
                        where : {
                          UserId : userId
                        }
                      })
                      .then(function(record){
                        record.increment('points', {by:1});
                      });
                  }
                  else {
                    models.Record
                      .findOne({
                        where : {
                          UserId : userId
                        }
                      })
                      .then(function(record){
                        record.increment('points', {by:0});
                      });
                  }
                }
              }

              //console.log('api game id:',apiGameId.id);

            });
        });
      });
  }
}

for (var i = 0; i < schedule.length; i++) {
  var weekNum = i+1;
  var week = {
    weekTest : schedule[i],
    weekNum  : weekNum
  };
  checkWeek(week);
}
