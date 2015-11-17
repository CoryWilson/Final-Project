var schedule = require('./schedule');

module.exports = function(CronJob,request,FB,models){
  var job = new CronJob(
    '59 23 00 * * 1', //'59 23 00 * * 1' runs at 11:59pm on Monday Night
    function(){
      console.log('Cron Job Run');
      function checkWeek(week){
        if(week.weekTest === true){ //find all picks where the week matches the current week
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
                      if(pickGameId === apiGameId){ //check to see if user pick game id matches that of the game in week's schedule
                        if(apiGameId.home_score > apiGameId.away_score && value === "home"){ //did the user pick the home team, when the home team won?

                          models.Record
                            .findOne({
                              where : {
                                UserId : userId
                              }
                            })
                            .then(function(record){
                              record.increment('points', {by:1}); //increment record by 1
                            });
                        }
                         else if(apiGameId.home_score < apiGameId.away_score && value === "away"){ //did the user pick the away team, when the away team won?

                          models.Record
                            .findOne({
                              where : {
                                UserId : userId
                              }
                            })
                            .then(function(record){
                              record.increment('points', {by:1}); //increment record by 1
                            });
                        }
                        else { //did the user pick incorrectly?

                          models.Record
                            .findOne({
                              where : {
                                UserId : userId
                              }
                            })
                            .then(function(record){
                              record.increment('points', {by:0}); //increment record by 0
                            });
                        }
                      }
                    }
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
    },
    function(){
      console.log('Cron Job End');
    },
    true,
    'America/New_York'
  );
};
