//File Name: ./config/strategies/local.js

var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User          = require('mongoose').model('User');

module.exports = function(){


  /***** Local Register *****/
  passport.use('local-register', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
      process.nextTick(function(){
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email },
        function(err, existingUser) {
          // if there are any errors, return the error
          if (err)
            return done(err);
          // check to see if theres already a user with that email
          if (existingUser) {
            return done(null, false, req.flash('registerMessage', 'That email is already taken.'));
          }
          //  If we're logged in, we're connecting a new local account.
          if(req.user) {
            var user            = req.user;
            user.local.email    = email;
            user.local.password = user.generateHash(password);
            user.save(function(err) {
              if (err)
                throw err;
              return done(null, user);
            });
          } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.local.email    = email;
            newUser.local.password = newUser.generateHash(password);
            // save the user
            newUser.save(function(err) {
              console.log('New User: ',newUser.local.email);
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
  }));

  /***** Local Login *****/
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form
    process.nextTick(function(){
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email' :  email },
      function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);
        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        // all is well, return successful user
        console.log('User: ',user);
        return done(null, user);
      });
    });
  }));

};
