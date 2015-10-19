//File Name: ./app/routes/showdowns.server.routes.js

var showdownsController    = require('../controllers/showdowns.server.controller.js'),
    passport     = require('passport');

module.exports = function(app,passport) {

    app.route('/createMatchups')
       .get(showdownsController.createShowdownList);
       //.post(showdowns.create);

    app.route('/schedule')
      .get(showdownsController.listShowdowns);

    app.get('/findCompetitor/:random_id', showdownsController.findCompetitor);

    app.param('random_id',showdownsController.findCompetitor);

};
