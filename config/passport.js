//File Name: ./config/passport.js

var FacebookStrategy = require('passport-facebook').Strategy;

var	bcrypt		 = require('bcrypt-nodejs'),
		dbconfig   = require('./db'),
	  mongoose 	 = require('mongoose'),
		mysql 		 = require('mysql'),
		passport 	 = require('passport');


var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE '+dbconfig.connection.database);
module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		connection.query("SELECT * FROM user WHERE id = ? ",[id], function(err, rows){
      done(err, rows[0]);
    });
	});

	//Facebook Strategy
	passport.use('facebook', new FacebookStrategy({
		clientID 		 			: process.env.FB_CLIENT_ID,
		clientSecret 			: process.env.FB_CLIENT_SECRET,
		callbackURL	 			: process.env.FB_CALLBACK_URL,
		passReqToCallback : true,
		profileFields			: ['emails','displayName','name']
	},
	function(req, token, refreshToken, profile, done){
		process.nextTick(function(){
			if(!req.user){
				//DB Query for User Facebook ID
				connection.query("SELECT * FROM user WHERE facebook_id = ?",[profile.id], function(err, rows){
					//If no db connection stop everything
					if(err){
						return done(err);
					}
					//If user exists log them in
					if(rows.length){
						return done(null, rows[0]);
					}
					//If user doesn't exist create new user
					else {
						var newFacebookUser = {
							facebook_id  : profile.id,
							access_token : token,
							firstName		 : profile.name.givenName,
							lastName     : profile.name.familyName,
							email				 : profile.emails[0].value
						};
						var insertQuery = "INSERT into user (facebook_id,access_token,firstName,lastName,email) values (?,?,?,?,?)";
						connection.query(
							insertQuery,
							[
								newFacebookUser.facebook_id,
								newFacebookUser.access_token,
								newFacebookUser.firstName,
								newFacebookUser.lastName,
								newFacebookUser.email
							],
							function(err, rows){
								newFacebookUser.id = rows.insertId;
								return done(null, newFacebookUser);
							}
						);
					}
				});
			}
		});
	}));
};
