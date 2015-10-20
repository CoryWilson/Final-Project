var EPL = require('../app/models/epl.server.model');

module.exports = function(stream, io){
  stream.on('data', function(data){

    var game = {
      date            : data.date,
      status          : data.status,
      week            : data.matchday,
      homeTeamName    : data.homeTeamName,
      awayTeamName    : data.awayTeamName,
      result          : {
        goalsHomeTeam : data.goalsHomeTeam,
        goalsAwayTeam : data.goalsAwayTeam
      }
    };

    var gameEntry = new EPL(game);

    gameEntry.save(function(err){
      if(!err) {
        io.emit('game', game);
      }
    });

  });
};
