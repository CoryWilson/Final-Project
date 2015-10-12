//File Name: ./app/routes/showdownSelections.server.routes.js
var users = require('../controllers/users.server.controller'),
    showdownSelections = require('../controllers/showdownSelections.server.controller');

module.exports = function(app){
  app.route('/commissioner/showdownSelections')
    .get(showdownSelections.list)
    .post(users.requiresLogin, users.isCommissioner, showdownSelections.create);
  app.route('/commissioner/showdownSelections/:weekId')
    .get(showdownSelections.read)
    .put(users.requiresLogin, users.isCommissioner, showdownSelections.update)
    .delete(users.requiresLogin, users.isCommissioner, showdownSelections.delete);

  app.param('weekId', showdownSelections.showdownSelectionById);
};
