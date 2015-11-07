//File Name: ./app/routes/users.server.routes.js

var usersController = require('../controllers/users.server.controller.js'),
    passport        = require('passport');

module.exports = function(app,passport) {

  //Sign In View
	app.get('/sign-in',usersController.renderSignIn);

  //Log Out
  app.get('/logout', usersController.logout);

  //Facebook Authenticate
  app.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope : 'email'
  }));

  //Facebook Auth Callback URL
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/sign-in',
    successRedirect: '/',
    scope: ['email']
  }));

};
