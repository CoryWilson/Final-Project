//File Name: ./app/routes/index.server.routes.js
var indexController = require('../controllers/index.server.controller');

module.exports = function(app) {
    app.get('/', indexController.renderIndex);
};
