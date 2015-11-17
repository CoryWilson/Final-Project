//File Name: ./app/routes/api.server.routes.js
var apiController = require('../controllers/api.server.controller');
var usersController = require('../controllers/users.server.controller');

module.exports = function(app) {

    app.get('/nfl', usersController.requiresAuth,  apiController.readNFLAPI);

    app.get('/nfl/:game_id', usersController.requiresAuth, apiController.readNFLGame);

    app.get('/soccer/:week',apiController.readSoccerAPI);

};
