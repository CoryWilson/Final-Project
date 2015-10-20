//File Name: ./app/controllers/league.server.controller.js

var League   = require('mongoose').model('League'),
    //Member   = require('mongoose').model('Member'),
    User     = require('mongoose').model('User'),
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

exports.createLeague = function(req,res,next){
  console.log(req.body);
  var league = new League(req.body);
  league.name = req.body.name;
  league.save(function(err){
    if(err){
      return next(err);
    } else {
      res.json(league);
    }
  });
};

exports.getLeagueById = function(req, res, next, id){
  League.findById(id)
    .exec(function(err, league){
      if(err)
        return next(err);
      if(!league)
        return next(new Error('Failed to load league '+id));

        req.league = league;
        next();
    });
};

exports.readLeague = function(req, res){
  res.json(req.league);
};

exports.getAllUsers = function(req,res,next){
  User.find(
    {},
    function(err,users){
      if(err){
        return next(err);
      } else {
        res.json(users);
      }
    }
  );
};

exports.getLeagues = function(req,res,next){
  League.find(
    {},
    function(err,league){
      if(err){
        return next(err);
      } else {
        res.json(league);
      }
    });
};

exports.getMembers = function(req,res,next){
  res.json(req.league.member);
};


exports.addMember = function(req,res,next){
  League.findOne(
    {'_id':req.league._id})
    .exec(function(err,league){
      if(err){
        return next(err);
      } else {
        league.member.push(req.body.member);
        league.save(function(err){
          if(err){
            return next(err);
          } else {
            res.json(league);
          }
        });
      }
    });
};

exports.getMemberById = function(req,res,next,memberId){
  console.log(req.league.member);
  League.findOne(
    {'_id' : req.league._id},
    {'member': {
        $elemMatch: {
          '_id':memberId
        }
      }
    })
    .populate('member','username')
    .exec(function(err,member){
      console.log(member);
      if(err){
        return next(err);
      } if(!member) {
        return next(new Error('Failed to load member '+id));
      } else {
        req.member = member;
        next();
      }
    });
};

exports.readMember = function(req, res){
  res.json(req.member);
};

exports.updateMember = function(req,res,next){

  var member = req.league.member;

  member.save(function(err){
    if(err){
      return next(err);
    } else {
      res.json(member);
    }
  });

};

exports.deleteMember = function(req,res,next){
  var member = req.league.member;
  member.remove(function(err){
    if(err){
      return next(err);
    } else {
      res.json(member);
    }
  });
};
