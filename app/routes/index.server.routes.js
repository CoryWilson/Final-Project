//File Name: ./app/routes/index.server.routes.js

module.exports = function(app) {
    var indexController = require('../controllers/index.server.controller');

    app.get('/',indexController.renderIndex);
};
