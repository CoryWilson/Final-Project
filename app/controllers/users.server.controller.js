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

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
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

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};
*/
