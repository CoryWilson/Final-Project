//File Name: ./config/strategies/twitter.js

var passport         = require('passport'),
    TwitterStrategy  = require('passport-twitter').Strategy,
    User             = require('mongoose').model('User'),
    configAuth       = require('../auth');

module.exports = function(){

  /***** Twitter Login *****/
  passport.use(new TwitterStrategy({
      consumerKey       : configAuth.twitterAuth.consumerKey,
      consumerSecret    : configAuth.twitterAuth.consumerSecret,
      callbackURL       : configAuth.twitterAuth.callbackURL,
      passReqToCallback : true,
    },
    function(req, token, tokenSecret, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
      process.nextTick(function() {
        if(!req.user) {
          User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
              return done(err);
            // if the user is found then log them in
            if (user) {
              // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.twitter.token) {
                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;

                user.save(function(err) {
                  if (err)
                    throw err;
                  return done(null, user);
                });
              }
              return done(null, user); // user found, return that user
            } else {
              // if there is no user, create them
              console.log(profile);
              var newUser                 = new User();
              // set all of the user data that we need
              newUser.twitter.id          = profile.id;
              newUser.twitter.token       = token;
              newUser.twitter.username    = profile.username;
              newUser.twitter.displayName = profile.displayName;
              // save our user into the database
              newUser.save(function(err) {
                if (err)
                  throw err;
                return done(null, newUser);
              });
            }
          });
        } else {
          // user already exists and is logged in, we have to link accounts
          var user            = req.user; // pull the user out of the session
          // update the current users twitter credentials
          user.twitter.id          = profile.id;
          user.twitter.token       = token;
          user.twitter.username    = profile.username;
          user.twitter.displayName = profile.displayName;
          // save the user
          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
        }
      });
    })
  );
};
