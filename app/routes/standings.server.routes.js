//File Name: ./app/routes/standings.server.routes.js

var standings    = require('../controllers/standings.server.controller.js'),
    passport     = require('passport');

module.exports = function(app,passport) {

    app.get('/standings', standings.list);

};
