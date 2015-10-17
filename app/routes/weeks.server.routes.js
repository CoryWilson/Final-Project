//File Name: ./app/routes/selections.server.routes.js

var weeksController    = require('../controllers/weeks.server.controller.js'),
    usersController = require('../controllers/users.server.controller.js');

module.exports = function(app) {
    app.route('/commissioner/weeks')
       .get(usersController.commissionerStatus, weeksController.list)
       .post(usersController.commissionerStatus,
       weeksController.create);

    app.route('/commissioner/weeks/:weekId')
      .get(weeksController.read)
      .put(usersController.commissionerStatus, weeksController.update)
      .delete(usersController.commissionerStatus, weeksController.delete);

    app.param('weekId',weeksController.weekById);
};
