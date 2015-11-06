//File Name: ./app/controllers/users.server.controller.js
module.exports = function(){

  var _renderLogin = function(req, res, next) {
  	res.render('login', {
  		title: 'Login',
  		messages: req.flash('loginMessage')
  	});
  };

  var _renderRegister = function(req, res, next) {
  	res.render('register', {
  		title: 'Register',
  		messages: req.flash('registerMessage')
  	});
  };


  var _renderProfile = function(req, res) {
  	res.render('profile', {
  		title: 'Profile',
  		user: req.user
  	});
  };

  var _profileInfo = function(req, res){
  	console.log(res);
  	res.json(req.user);
  };

  var _logout = function(req, res) {
  	req.logout();
  	res.redirect('/');
  };

  var _requiresLogin = function(req, res, next) {
  	if (!req.isAuthenticated()) {
  		return res.status(401).send({
  			message: 'User is not logged in'
  		});
  	}
  	next();
  };

  return {
    requiresLogin  : _requiresLogin,
    renderLogin    : _renderLogin,
    renderRegister : _renderRegister,
    renderProfile  : _renderProfile,
    profileInfo    : _profileInfo,
    logout         : _logout
  };
}();


/*
var _list = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

exports.renderAddLocal = function(req, res, next) {
	res.render('connect-local', {
		title: 'Add Local Login',
		messages: req.flash('registerMessage')
	});
};

exports.unlinkLocal = function(req, res) {
	var user            = req.user;
	user.local.email    = undefined;
	user.local.password = undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
};

exports.unlinkFacebook = function(req, res) {
	var user            = req.user;
	user.facebook.token = undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
};

exports.unlinkTwitter = function(req, res) {
	var user           = req.user;
	user.twitter.token = undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
};

exports.findUserById = function(req, res){
	User.findById(
		req.user._id,
		function(err,result){
			if(err){
				return(err);
			} else {
				res.json(result);
			}
		}
	);
};
*/
