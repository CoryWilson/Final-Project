//File Name: ./app/controllers/league.server.controller.js

var League   = require('mongoose').model('League'),
    User     = require('mongoose').model('User');

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

exports.getMembers = function(req, res){
  res.json(req.league.members);
};


//============================\\
//===== League Showdowns =====\\
//============================\\
exports.createShowdowns = function(req, res, next){

  League.findOne({'_id':req.league._id}) //Find league by id
    .exec(function(err,league){
      if(err){
        return next(err); //If you can't find the league return an error
      } else {
        for(var i = 0; i < req.body.weeks; i++){ //loop through amount of weeks
          if (league.members.length % 2 !== 0) {
            console.log("You must have an even number of members. You currently have " + league.members.length + " members.");
          } else {
            var arr1 = league.members.slice(),
                arr2 = league.members.slice();

            arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
            arr2.sort(function() { return 0.5 - Math.random();});

            var halfArr1 = arr1.length/2;

            for(var j = 0; j < halfArr1; j++) {
              var member1 = arr1.pop(),
                  member2 = arr2[0] === member1 ? arr2.pop() : arr2.shift();

              var weekNum = i + 1;
              league.showdowns.push({week:weekNum,showdownNum:j,competitors:[member1,member2]}); //save pairing information into showdowns array
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

//returns the week's showdowns in json form
exports.readWeeklyShowdowns = function(req, res){
  res.json(req.league);
};

//Finds showdowns for week based on week number parameter
exports.getWeekNum = function(req, res, next, weekNum){
  var weekNumber = Number(weekNum);
  League.aggregate([
  	{$unwind: "$showdowns"},
  	{$match:
  	   { $and: [
  	     {"_id" : req.league._id} ,
  	     {"showdowns.week" : weekNumber} //adding weekNum param returns an empty array
  	  ]}
  	},
  	{$project: {"showdowns": 1}}
  ],function(err, results){
      if(err){
        return next(err);
      } if(!results) {
        return next(new Error('Failed to load week '+ results._id));
      } else {
        League.populate(
          results,
          {path:"showdowns.competitors.user_id"},
          function(error, callback){
            console.log(callback);
            req.league = callback;
            next();
          });

      }
    });

};

exports.getShowdownByNum = function(req, res, next, showdownNum){
  var showdownNumber = Number(showdownNum);
  var showdown = req.league[showdownNumber];
  res.json(showdown);
};

exports.readShowdown = function(req, res){
  res.json(req.league);
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
exports.readStandings = function(req, res){
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
