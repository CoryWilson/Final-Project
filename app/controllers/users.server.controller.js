//File Name: ./app/controllers/users.server.controller.js

var User 	 	 = require('mongoose').model('User'),
		passport = require('passport');

exports.renderLogin = function(req, res, next) {
	res.render('login', {
		title: 'Login',
		message: req.flash('loginMessage')
	});
};

exports.renderRegister = function(req, res, next) {
	res.render('register', {
		title: 'Register',
		messages: req.flash('registerMessage')
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

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.profile = function(req, res) {
	res.render('profile', {
		title: 'Profile',
		user: req.user
	});
};

exports.profileInfo = function(req, res){
	res.json(req.user);
};

exports.edit = function(req, res){
	res.render('edit-profile', {
		title: 'Edit Profile',
		user: req.user
	});
};

exports.update = function(req, res, next) {

	var user = req.user;
	user.preferences.username = req.body.username;

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			console.log(user);
			res.redirect('/profile');
		}
	});

	/*User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			console.log(user);
			req.user = user;
			console.log(user);
			res.redirect('/profile');
		}
	});*/
};

/*
exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne({
			_id: id
		},
		function(err, user) {
			if (err) {
				return next(err);
			} else {
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
		}
	});
};
*/
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};

exports.isCommissioner = function(req, res, next) {
	if (req.user.commissioner === true) { //commisioner id
		next();
	} else {
		return res.status(403).send({
			message: 'User is not commissioner'
		});
	}
};
