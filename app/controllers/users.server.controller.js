//File Name: ./app/controllers/users.server.controller.js

var User 	 	 = require('mongoose').model('User'),
		passport = require('passport');

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.renderRegisterLogin = function(req,res,next){
	res.render('register-login', {
		title				 		: 'Register or Login',
		loginMessage 		: req.flash('loginMessage'),
		registerMessage : req.flash('registerMessage')
	});
};

exports.renderLogin = function(req, res, next) {
	res.render('login', {
		title: 'Login',
		messages: req.flash('loginMessage')
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
	console.log(res);
	res.json(req.user);
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

exports.edit = function(req, res){
	res.render('edit-profile', {
		title: 'Edit Profile',
		user: req.user
	});
};

exports.update = function(req, res, next) {

	var user = req.user;
	user.username = req.body.username;
	user.league		= req.body.league;

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
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};

exports.commissionerStatus = function(req, res, next) {
	if (!req.user.commissioner) { //commisioner id
		return res.redirct('/');
	}
	next();
};
