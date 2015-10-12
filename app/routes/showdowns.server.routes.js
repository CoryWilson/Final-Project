//File Name: ./app/routes/showdowns.server.routes.js

var showdowns    = require('../controllers/showdowns.server.controller.js'),
    passport     = require('passport');

module.exports = function(app,passport) {

    app.get('/matchups', showdowns.scheduling);

    app.get('/findCompetitor/:random_id', showdowns.findCompetitor);

    app.param('random_id',showdowns.findCompetitor);

};
