//File Name: ./app/routes/game.server.routes.js
var gameController = require('../controllers/game.server.controller.js');
var usersController = require('../controllers/users.server.controller.js');

module.exports = function(app){
  //Create Pick
  app.post('/pick', usersController.requiresAuth, gameController.createPick);

  //Get Leaderboard
  app.get('/leaderboard', usersController.requiresAuth, gameController.getFriendsRecord);
};
