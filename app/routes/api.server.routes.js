//File Name: ./app/routes/api.server.routes.js

module.exports = function(app) {
    var apiController = require('../controllers/api.server.controller');

    app.get('/nfl',apiController.readNFLAPI);
    app.get('/getNFLGame/:game_id', apiController.readNFLGame);
    app.get('/soccer/:week',apiController.readSoccerAPI);
};
