//File Name: ./app/controllers/league.server.controller.js

var League   = require('mongoose').model('League'),
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


//====== League ======\\

exports.getLeagues = function(req,res,next){
  League.find()
    .exec(function(err,league){
      if(err){
        return next(err);
      } else {
        res.json(league);
      }
    });
};

exports.createLeague = function(req,res,next){
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
    .populate('members.user_id')//populate the user information based off the user_id
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
  User.find()
    .exec(function(err,users){
      if(err){
        return next(err);
      } else {
        res.json(users);
      }
    }
  );
};


//===== Members ======\\

exports.addMember = function(req,res,next){
  League.findOne(
    {'_id':req.league._id})
    .exec(function(err,league){
      if(err){
        return next(err);
      } else {
        league.members.push({user_id:req.body.member._id}); //pushes the user's id into the user_id section of the members array
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
  console.log(memberId);
  League.findOne(
      {'_id':req.league._id},//search for user's league
      {'members':{$elemMatch:{'_id':memberId}}}//see if url param for memberId matches the _id in members
    )
    .populate('members.user_id')//populate the user information based off the user_id
    .exec(function(err,member){
      console.log(member);
      if(err){
        return next(err);
      } if(!member) {
        return next(new Error('Failed to load member '+ member._id));
      } else {
        req.league = member;
        next();
      }
    });
};

exports.readMember = function(req, res){
  res.json(req.league.members);//return member json
};

exports.updateMember = function(req,res,next){
  var member = req.league.members; //set the member equal to current user
  member.save(function(err){
    if(err){
      return next(err);
    } else {
      res.json(member); //return updated info
    }
  });
};

exports.deleteMember = function(req,res,next){
  var member = req.league.members; //set the member equal to the current member
  member.remove(function(err){
    if(err){
      return next(err);
    } else {
      res.json(member); //reutrn updated info
    }
  });
};

exports.getMembers = function(req,res,next){
  res.json(req.league.members);
};


//====== Showdowns =====\\

// exports.getShowdowns = function(req, res, next){
//   res.json(req.league.showdowns);
// };

exports.readWeek = function(req, res, next){
  res.json(req.league.showdowns);
};

exports.getWeekNum = function(req, res, next, weekNum){
  League.findOne()
    .exec(function(err,week){

    });
};

exports.getShowdownById = function(req, res, next, showdownId){

};

exports.updateShowdown = function(req, res, next){

};
