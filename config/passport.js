//File Name: ./config/passport.js

var passport 	 = require('passport'),
	  mongoose 	 = require('mongoose'),
		Config 		 = require('./config');

module.exports = function() {
	var User = mongoose.model('User');

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
      done(err, user);
    });
	});

	require('./strategies/local.js')();
	require('./strategies/facebook.js')();
	require('./strategies/twitter.js')();
};
