//File Name: ./app/routes/users.server.routes.js

var users    = require('../controllers/users.server.controller.js'),
    passport = require('passport');

module.exports = function(app,passport) {

  /*
  app.route('/users')
    .post(users.create)
    .get(users.list);

  app.route('/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  app.param('userId', users.userByID);
  */

  //User Register Route
  app.route('/register')
		.get(users.renderRegister)
		.post(passport.authenticate('local-register', {
      successRedirect : '/',
      failureRedirect : '/register',
      failureFlash    : true
    }));

  //User Login Route
	app.route('/login')
  	.get(users.renderLogin)
  	.post(passport.authenticate('local-login', {
  		successRedirect: '/',
  		failureRedirect: '/login',
  		failureFlash: true
  	}));

  //User Logout Route
  app.get('/logout', users.logout);

  //Facebook Auth Routes
  app.get('/auth/facebook',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope: ['email']
  }));
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope: ['email']
  }));

  //Twitter Auth Routes
  app.get('/auth/twitter',
  passport.authenticate('twitter', {
		failureRedirect: '/login'
	}));
	app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
		failureRedirect: '/login',
		successRedirect: '/'
	}));

};
