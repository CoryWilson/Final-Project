//File Name: ./app/routes/users.server.routes.js

var usersController    = require('../controllers/users.server.controller.js');

module.exports = function(app,passport) {

    app.get('/profile', usersController.profile);

    app.get('/editProfile', usersController.edit);

    app.post('/updateProfile', usersController.update);

    app.get('/profileInfo', usersController.findUserById);

    app.get('/logout', usersController.logout);

  //------------------------------------------
  // User Authenticate routes
  //------------------------------------------

  //Local Register Route
  app.route('/register')
		.get(usersController.renderRegister)
		.post(passport.authenticate('local-register', {
      successRedirect : '/',
      failureRedirect : '/register',
      failureFlash    : true
    }));

  //Local Login Route
	app.route('/login')
  	.get(usersController.renderLogin)
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
    .get(usersController.renderAddLocal)
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
  app.get('/unlink/local', usersController.unlinkLocal);

	//Unlink Facebook
	app.get('/unlink/facebook', usersController.unlinkFacebook);

  //Unlink Twitter
	app.get('/unlink/twitter', usersController.unlinkTwitter);

};
