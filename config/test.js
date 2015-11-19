var moment = require('moment');
var models = require('../app/models');
var request = require('request');
var schedule = require('./schedule');


for (var i = 0; i < schedule.length; i++) {
  var weekNum = i+1;
  var url = 'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week='+weekNum+'&season_type=REG';
  var gameArray = [];
  if (schedule[i] === true) {
    request
     .post({url:url},
       function(err, httpResponse, body){
         if(err){
           console.log(err);
         }
         var data = JSON.parse(body);
         for (var j = 0; j < data.length; j++) {
           var game        = data[j];
           var id          = game.id;
           var home        = game.home;
           var away        = game.away;
           var day         = moment.unix(game.time).format('dddd');
           var date        = moment.unix(game.time).format('MMM D YYYY');
           var time        = moment.unix(game.time).format('h:mm a');
           var week        = game.week;
           var season_type = game.season_type;
           var final       = game.final;
           var home_score  = game.home_score;
           var away_score  = game.away_score;
           gameArray.push({id:id,home:home,away:away,day:day,date:date,time:time,week:week,season_type:season_type,final:final,home_score:home_score,away_score:away_score});
         }
         console.log(gameArray);
       }
    );
  }
}
