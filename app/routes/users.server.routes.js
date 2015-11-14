//File Name: ./app/routes/users.server.routes.js
var usersController = require('../controllers/users.server.controller.js');

module.exports = function(app,passport) {
  //Get User Info
  app.post('/account', usersController.account);

  app.post('/facebook', usersController.facebook);

  //Facebook Authenticate
  app.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope : 'email'
  }));

  //Facebook Auth Callback URL
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/sign-in',
    successRedirect: '/#!/game',
    scope: ['email']
  }));

	//Log Out
  app.get('/logout', usersController.logout);
};
