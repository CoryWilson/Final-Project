//File Name: ./app/routes/game.server.routes.js
var gameController = require('../controllers/game.server.controller.js');

module.exports = function(app){
  //Create Pick
  app.post('/pick',gameController.createPick);

  //Update Records
  app.get('/updateRecord',gameController.updateRecord);

  //Get Leaderboard
  app.get('/leaderboard',gameController.getFriendsRecord);
};
