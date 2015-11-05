//File Name: ./app/routes/league.server.routes.js
var leagueController = require('../controllers/league.server.controller.js');

module.exports = function(app,passport) {

  //===========================\\
  //===== League Overview =====\\
  //===========================\\
  app.route('/league')
     .get(leagueController.getLeagues)
     .post(leagueController.createLeague); //add commissioner requirement

  app.route('/league/:leagueId')
     .get(leagueController.readLeague);
     //.delete(leagueController.deleteLeague); //add commissioner requirement

  app.route('/league/:leagueId/members')
     .get(leagueController.getMembers)
     .post(leagueController.addMember); //add commissioner requirement

  app.get('/userlist',leagueController.getAllUsers);

  //==========================\\
  //===== League Members =====\\
  //==========================\\
  app.route('/league/:leagueId/members/:memberId')
     .get(leagueController.readMember)
     .put(leagueController.updateMember); //add commissioner requirement
     //.delete(leagueController.deleteMember); //add commissioner requirement

  app.param('leagueId',leagueController.getLeagueById);
  app.param('memberId',leagueController.getMemberById);

  //============================\\
  //===== League Showdowns =====\\
  //============================\\
  app.post('/league/:leagueId/showdowns',leagueController.createShowdowns); //create all showdowns

  app.route('/league/:leagueId/showdowns/:weekNum')
     .get(leagueController.readWeeklyShowdowns); //read the weekly showdowns

  app.route('/league/:leagueId/showdowns/:weekNum/:showdownNum')
    .get(leagueController.readShowdown) //read the individual showdown based on weekNum and showdownNum
    .put(leagueController.updateShowdown); //used for updating the individual showdown record

  app.param('weekNum',leagueController.getWeekNum); //get showdowns based on week
  app.param('showdownNum',leagueController.getShowdownByNum); //get showdowns based on number

  //============================\\
  //===== League Standings =====\\
  //============================\\
  app.route('/league/standings')
     .get(leagueController.getStandings);

  app.route('/league/standings/:memberId')
     .get(leagueController.getStandingsById);

};
