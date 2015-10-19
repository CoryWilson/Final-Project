//File Name: ./app/controllers/showdowns.server.controller.js

var Showdown = require('mongoose').model('Showdown'),
    User     = require('mongoose').model('User'),
    robin    = require('roundrobin'),
		passport = require('passport');


var getErrorMessage = function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

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

exports.listShowdowns = function(req, res, next){
  Showdown.find()
    .populate('competitors','username')
    .exec(function(err, showdowns){
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
      //  res.json(showdowns);
        console.log(showdowns[0].weeks[0][0].competitors[0]);
        res.render('showdown',{
          title: 'Showdowns',
          user: req.user,
          showdowns: showdowns
        });
      }
    });
};

exports.create = function(req, res){
  var showdown = new Showdown(req.body);
  week.creator = req.user;
  week.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(week);
    }
  });
};

// exports.createShowdownList = function(req, res, next, groupings){
//   //take users who are paired
//   //create weekly matchups
//   var roundRobin = scheduling();
//
//   var showdownList = new Showdown(req.body);
//   showdownList.weeks = roundRobin;
//   Showdown.save(function(err){
//     if(err){
//       return res.status(400).send({
//         message: getErrorMessage(err)
//       });
//     } else {
//       res.json(showdownList);
//     }
//   });
// };


exports.createShowdownList = function(req, res, next) {
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
            var roundRobin = robin(leagueArray.length,league_ids);
            //res.json(roundRobin);
            console.log(roundRobin);
            var showdownList = new Showdown(req.user);
            showdownList.weeks = roundRobin;
            showdownList.save(function(err){
              if(err){
                return res.status(400).send({
                  message: getErrorMessage(err)
                });
              } else {
                res.json(showdownList);
              }
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
