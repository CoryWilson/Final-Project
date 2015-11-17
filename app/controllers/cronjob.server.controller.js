module.exports = function(CronJob,request,FB,models){
  var job = new CronJob({
    cronTime: '59 23 0 * * 1',
    onTick: function(){
      console.log('Cron Job Run');
      models.Pick
        .findAll({
          where : {
            week : 12 //current week
          }
        })
        .then(function(data){
          //make one api request
          request
            .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=12&season=REG'},
              function(err, httpResponse, schedule){
            data.forEach(function(picks){ //looping through the picks
              var value = picks.value; //users pick value
              var game_id = Number(picks.game_id); //getting the game_id of the pick and setting it to a number
              var user_id = Number(picks.UserId); //getting the user id
              if(err){
                console.log(err);
              }
              var games = JSON.parse(schedule); //parse results

              console.log(games);

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
                      });
                  }
                }
              }
            });//end data.forEach
          });//end request
        });
    },
    start: true,
    timeZone: 'America/New_York'
  });
  job.start();
};
