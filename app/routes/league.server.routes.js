//File Name: ./app/routes/league.server.routes.js
var leagueController = require('../controllers/league.server.controller.js');

module.exports = function(app) {
  app.route('/league')
     .get(leagueController.getLeagues)
     .post(leagueController.createLeague);

  app.route('/league/:leagueId')
     .get(leagueController.readLeague);
  //    .delete(leagueController.deleteLeague);

  app.route('/league/:leagueId/members')
     .get(leagueController.getMembers)
     .post(leagueController.addMember);

  app.get('/userlist',leagueController.getAllUsers);

  app.route('/league/:leagueId/members/:memberId')
     .get(leagueController.readMember)
     .put(leagueController.updateMember)
     .delete(leagueController.deleteMember);

  app.param('leagueId',leagueController.getLeagueById);
  app.param('memberId',leagueController.getMemberById);

  // app.route('/league/:leagueId/showdowns')
  //    .get(leagueController.getShowdowns);

  app.route('/league/:leagueId/showdowns/:weekNum')
     .get(leagueController.readWeek);

//   app.route('/league/showdowns/:weekNum/:showdownId')
//      .get(leagueController.getShowdownById)
//      .put(leagueController.updateShowdown);
//
//   app.route('/league/results/')
//      .get(leagueController.getResults);
//
//   app.route('/league/results/:memberId')
//      .get(leagueController.getResultsById);
  app.param(':weekNum',leagueController.getWeekNum);
//
};
