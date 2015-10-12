//File Name: ./app/routes/users.server.routes.js

var users    = require('../controllers/users.server.controller.js'),
    passport = require('passport');

module.exports = function(app,passport) {

    app.get('/profile', users.profile);

    app.get('/editProfile', users.edit);

    app.post('/updateProfile', users.update);

    app.get('/profileJSON', users.profileInfo);

    app.get('/logout', users.logout);

  //------------------------------------------
  // User Authenticate routes
  //------------------------------------------

  //Local Register Route
  app.route('/register')
		.get(users.renderRegister)
		.post(passport.authenticate('local-register', {
      successRedirect : '/',
      failureRedirect : '/register',
      failureFlash    : true
    }));

  //Local Login Route
	app.route('/login')
  	.get(users.renderLogin)
  	.post(passport.authenticate('local-login', {
  		successRedirect: '/',
  		failureRedirect: '/login',
  		failureFlash: true
  	}));

  //Facebook Authenticate Routes
  app.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope : 'email'
  }));
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope: ['email']
  }));

  //Twitter Authenticate Routes
  app.get('/auth/twitter',
  passport.authenticate('twitter', {
		scope: 'email'
	}));
	app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
		failureRedirect: '/login',
		successRedirect: '/',
    scope: ['email']
	}));

  //------------------------------------------
  // User Authorize routes
  //------------------------------------------

  //Local Authorize Routes
  app.route('/connect/local')
    .get(users.renderAddLocal)
    .post(passport.authenticate('local-register', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

  //Facebook Authorize Routes
  app.get('/connect/facebook',
  passport.authorize('facebook', {
    scope : 'email'
  }));
  app.get('/connect/facebook/callback',
  passport.authorize('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope: ['email']
  }));

  //Twitter Authorize Routes
  app.get('/connect/twitter',
  passport.authorize('twitter', {
    scope: 'email'
  }));
  app.get('/connect/twitter/callback',
  passport.authorize('twitter', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope: ['email']
  }));

  //------------------------------------------
  // Unlink Accounts Routes
  //------------------------------------------

  //Unlink Local
  app.get('/unlink/local', users.unlinkLocal);

	//Unlink Facebook
	app.get('/unlink/facebook', users.unlinkFacebook);

  //Unlink Twitter
	app.get('/unlink/twitter', users.unlinkTwitter);

};
