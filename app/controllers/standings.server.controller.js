//File Name: ./app/controllers/standings.server.controller.js

var Standings = require('mongoose').model('Standings'),
    User      = require('mongoose').model('User'),
		passport  = require('passport');


exports.list = function(req, res, next) {

    User.find({
        league:req.user.league
      },
      function(err, leagueMembers){
        if(err){
          return next(err);
        } else {
          res.render('standings',{
              title: 'Standings',
              user: req.user,
              leagueMembers: leagueMembers
          });
        }
      }
    );


};

exports.read = function(req, res) {
  var standings = req.standings;
	res.json(standings);
};

/*
exports.standingsByID = function(req, res, next, id) {
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
