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
  //maybe a generate weeks button
  //maybe a generate showdowns button

  // app.route('/league/:leagueId/showdowns')
  //    .get(leagueController.getShowdowns);

  app.post('/league/:leagueId/showdowns',leagueController.createShowdowns);

  app.route('/league/:leagueId/showdowns/:weekNum')
     .get(leagueController.readWeeklyShowdowns);

  app.route('/league/:leagueId/showdowns/:weekNum/:showdownNum')
    .get(leagueController.readShowdown)
    .put(leagueController.updateShowdown);

  app.param('weekNum',leagueController.getWeekNum);
  app.param('showdownNum',leagueController.getShowdownByNum);

  //============================\\
  //===== League Standings =====\\
  //============================\\
  app.route('/league/standings')
     .get(leagueController.getStandings);

  app.route('/league/standings/:memberId')
     .get(leagueController.getStandingsById);

};
