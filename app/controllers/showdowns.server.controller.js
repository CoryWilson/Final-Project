//File Name: ./app/controllers/showdowns.server.controller.js

var Showdown = require('mongoose').model('Showdown'),
    User     = require('mongoose').model('User'),
    robin    = require('roundrobin'),
		passport = require('passport');

/*
exports.league_ids = function(req, res){
  User.distinct(
    '_id',
    {
      league: req.user.league
    },
    function(err, ids){
      res.json(ids);
    }
  );
};
*/

exports.scheduling = function(req, res) {
  User.distinct(
    '_id',
    {
      league: req.user.league
    },
    function(err, league_ids){
      User.find({
          league: req.user.league
        },
        function(err, leagueArray){
          if(err){
            return next(err);
          } else {
            var roundRobin = robin(leagueArray.length,league_ids)
            res.render('showdown',{
              title: 'Matchups',
              matchups: roundRobin
            });
          }
        }
      );
    }
  );

};


exports.findCompetitor = function(req, res, next, random_id) {
	User.findOne({
      league: req.user.league, //checks to make sure the other user is in your league
			_id: random_id, //grabs user based off random _id
		},
		function(err, competitor) {
			if (err) {
				return next(err);
			} else {
			  res.json(competitor);
			}
		}
	);
};


exports.shuffle = function(array) {

  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};
