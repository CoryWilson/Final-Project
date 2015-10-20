//File Name: ./app/routes/showdowns.server.routes.js

var showdownsController    = require('../controllers/showdowns.server.controller.js'),
    passport     = require('passport');

module.exports = function(app,passport) {

    app.route('/showdowns')
       //.get(showdownsController.listShowdowns)
       .get(showdownsController.showdownEJS)
       .post(showdownsController.createShowdown);

    app.route('/showdowns/pairings')
       .get(showdownsController.listPairings)
       .post(showdownsController.createPairings);

    app.get('/showdowns/:showdownId/:opponentId', showdownsController.getShowdownInfo, showdownsController.getShowdownOpponent);

    app.get('/showdowns/:opponentId', showdownsController.getShowdownOpponent);

    app.get('/showdowns/opponents', showdownsController.getShowdownOpponents);

    app.param('showdownId',showdownsController.getShowdownInfo);
    app.param('opponentId',showdownsController.getShowdownOpponent);

};
