var FacebookStrategy = require('passport-facebook').Strategy;
var models           = require('../app/models');
var User             = models.User;

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({where: {id: id}})
    .then(function(user){
      done(null, user);
    }).error(function(err){
      done(err, null);
    });
  });

  // Use passport strategy to create user account
  passport.use('facebook', new FacebookStrategy({
    clientID 		 			: process.env.FB_CLIENT_ID,
		clientSecret 			: process.env.FB_CLIENT_SECRET,
		callbackURL	 			: process.env.FB_CALLBACK_URL,
		passReqToCallback : true,
		profileFields			: ['emails','displayName','name']
  }, function(req, access_token, refreshToken, profile, done){
		process.nextTick(function(){
			if(!req.user){//If there is no user run this code
				//DB Query for User Facebook ID
				User.find({where:{facebook_id:profile.id}})
          .then(function(user){
            if(user) { //If there is a user return the user
              return done(null, user);
            } else { //Else there is no user so lets create the user
              User.create(
                {
                  facebook_id  : profile.id,
                  access_token : access_token,
                  firstName    : profile.name.givenName,
                  lastName     : profile.name.familyName
                }
              )
                .then(function(newUser){
                  console.log(newUser);
                  models.Record
                    .create({
                      points : 0,
                      UserId : newUser.id
                    }).then(function(data){
                      console.log(data);
                    });
                  return done(null, newUser);
                })
                .error(function(err){
                  done(err, null);
                });
  					}
          }).error(function(err){
            done(err, null);
          });
      }
		});
	}));

};
