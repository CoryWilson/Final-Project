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

//===========================\\
//===== League Overview =====\\
//===========================\\
exports.getLeagues = function(req, res, next){
  League.find()
    .exec(function(err,league){
      if(err){
        return next(err);
      } else {
        res.json(league);
      }
    });
};

exports.createLeague = function(req, res, next){
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

exports.getAllUsers = function(req, res, next){
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

//==========================\\
//===== League Members =====\\
//==========================\\
exports.addMember = function(req, res, next){
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

exports.getMemberById = function(req, res, next, memberId){
  League.findOne(
      {'_id':req.league._id},//search for user's league
      {'members':{$elemMatch:{'_id':memberId}}}//see if url param for memberId matches the _id in members
    )
    .populate('members.user_id')//populate the user information based off the user_id
    .exec(function(err, member){
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

exports.updateMember = function(req, res, next){
  var member = req.league.members; //set the member equal to current user
  member.save(function(err){
    if(err){
      return next(err);
    } else {
      res.json(member); //return updated info
    }
  });
};

exports.deleteMember = function(req, res, next){
  var member = req.league.members; //set the member equal to the current member
  member.remove(function(err){
    if(err){
      return next(err);
    } else {
      res.json(member); //reutrn updated info
    }
  });
};

exports.getMembers = function(req, res, next){
  res.json(req.league.members);
};


//============================\\
//===== League Showdowns =====\\
//============================\\
exports.createShowdowns = function(req, res, next){

  League.findOne(
    {'_id':req.league._id})
    .exec(function(err,league){
      if(err){
        return next(err);
      } else {
        //league.members the members array
        for(i = 0; i < req.body.weeks; i++){ //loop through amount of weeks
          if (league.members.length % 2 !== 0) {
            alert("You must have an even number of members. You currently have " + league.members.length + " members.");
          } else {
            var arr1 = league.members.slice(), // copy array
                arr2 = league.members.slice(); // copy array again

            arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
            arr2.sort(function() { return 0.5 - Math.random();});

            while (arr1.length) {
              var member1 = arr1.pop(), // get the last value of arr1
                  member2 = arr2[0] == member1 ? arr2.pop() : arr2.shift();
                  //        ^^ if the first value is the same as name1,
                  //           get the last value, otherwise get the first
              var weekNum = i + 1;
              league.pairings.push({pairing:[{week:weekNum,user1:member1,user2:member2}]}); //save pairing information into pairings array
            }
          }
        }

         //pushes the user's id into the user_id section of the members array
        league.save(function(err){
          if(err){
            return next(err);
          } else {
            res.json(league);
          }
        });
      }
    }
  );
};
// /league/:leagueId/showdowns/1/1

exports.readWeek = function(req, res, next){
  res.json(req.league.showdowns.week);
};

exports.getShowdowns = function(req, res, next){
  res.json(req.league.showdowns);
};

exports.getWeekNum = function(req, res, next, weekNum){
  console.log(weekNum);
  League.find(
      { '_id': req.league._id },
      { 'showdowns': { $elemMatch: { 'week': weekNum } } }
    )
    .exec(function(err, week){
      console.log(week);
      if(err){
        return next(err);
      } if(!week) {
        return next(new Error('Failed to load member '+ week._id));
      } else {
        req.league = week;
        next();

      }
    });
};

exports.getShowdownById = function(req, res, next, showdownId){
  League.find(
    { '_id': req.league._id },
    { 'showdowns': { $elemMatch: {'showdownId': showdownId } } }
  )
    .exec(function(err, showdown){
      if(err){
        return next(err);
      } if(!showdown) {
        return next(new Error('Failed to load member '+ showdown._id));
      } else {
        req.league = showdown;
        next();
      }
    });
};

exports.readShowdown = function(req, res, next){
  res.json(req.league.showdowns);
};

exports.updateShowdown = function(req, res, next){
  var showdown = req.league.showdowns; //set the member equal to current user
  showdown.save(function(err){
    if(err){
      return next(err);
    } else {
      res.json(showdown); //return updated info
    }
  });
};

//============================\\
//===== League Standings =====\\
//============================\\
exports.readStandings = function(req, res, next){
  res.json(req.league.standings);
};

exports.getStandings = function(req, res, next){
  League.findOne(
      { '_id' : req.league._id }
    )
    .exec(function(err, standings){
      if(err){
        return next(err);
      } if(!standings) {
        return next(new Error('Failed to load member '+ standings._id));
      } else {
        res.json(standings);
      }
    });
};

exports.getStandingsById = function(req, res, next, memberId){
  League.findOne(
      { '_id' : req.league_id },
      { 'members': { $elemMatch: { '_id': memberId } } }
    )
    .exec(function(err, standings){
      if(err){
        return next(err);
      } if(!standings) {
        return next(new Error('Failed to load member '+ standings._id));
      } else {
        req.league = standings;
        next();
      }
    });
};
