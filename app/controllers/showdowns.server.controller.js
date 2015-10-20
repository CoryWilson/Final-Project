//File Name: ./app/controllers/showdowns.server.controller.js

var Showdown   = require('mongoose').model('Showdown'),
    Pairings   = require('mongoose').model('Pairings'),
    User       = require('mongoose').model('User'),
    roundRobin = require('roundrobin'),
		passport   = require('passport');


var getErrorMessage = function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.showdownEJS = function(req, res){
  res.render('showdown',{
    title: 'Showdown',
    user: req.user
  });
};

exports.createPairings = function(req, res, next){
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
            var pairings = roundRobin(leagueArray.length,league_ids);
            var pairingsList = new Pairings(req.user);
            pairingsList.league = req.user.league;
            pairingsList.weeks = pairings;
            pairingsList.save(function(err){
              if(err){
                return res.status(400).send({
                  message: getErrorMessage(err)
                });
              } else {
                res.json(pairingsList);
              }
            });
          }
        }
      );
    }
  );
};

exports.listPairings = function(req, res, next){
  Pairings.find({
    league: req.user.league
  },
    function(err, pairings){
      if(err){
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(pairings);
      }
    }
  );
};

exports.createShowdown = function(req, res, next){

  var showdown = new Showdown(req.body);
  showdown.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(showdown);
    }
  });

};

exports.listShowdowns = function(req, res, next){
  Showdown.find()
    .populate('competitors','username')
    .exec(function(err, showdowns){
      if(err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(showdowns);
      }
    });
};

exports.getShowdownInfo = function(req, res, next, showdownId){

  Showdown.findById(showdownId,
    function(err, game) {
      if(err) {
          return next(err);
      } else {
        res.json(game);
        //res.send(game);
      }
  });

};

exports.getShowdownOpponent = function(req, res, next, opponentId){

  User.findById(opponentId,
    function(err, opponent) {
      if(err) {
        return next(err);
      } else {
        res.json(opponent);
      }
  });

};

exports.listPairings = function(req, res, next){
  Pairings.find({
    league: req.user.league
  },
    function(err, pairings){
      if(err){
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(pairings);
      }
    }
  );
};

exports.getShowdownOpponents = function(req, res, next){
  Pairings.find({

    },
    function(err, opponents){
      if(err){
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(opponents);
      }
    }
  );
};
