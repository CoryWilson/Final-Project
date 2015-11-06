// //File Name: ./app/controllers/league.server.controller.js
//
// var League   = require('mongoose').model('League'),
//     Showdown = require('mongoose').model('Showdown'),
//     User     = require('mongoose').model('User');
//
// //===========================\\
// //===== League Overview =====\\
// //===========================\\
// module.exports.getLeagues = function(req, res, next){
//   League.find()
//     .exec(function(err,league){
//       if(err){
//         return next(err);
//       } else {
//         res.json(league);
//       }
//     });
// };
//
// module.exports.createLeague = function(req, res, next){
//   var league = new League(req.body);
//   league.name = req.body.name;
//   league.save(function(err){
//     if(err){
//       return next(err);
//     } else {
//       res.json(league);
//     }
//   });
// };
//
// module.exports.getLeagueById = function(req, res, next, id){
//   League.findById(id)
//     .populate('members.user_id showdowns.competitors.user_id')//populate the user information based off the user_id
//     .exec(function(err, league){
//       if(err)
//         return next(err);
//       if(!league)
//         return next(new Error('Failed to load league '+id));
//         req.league = league;
//         next();
//     });
// };
//
// module.exports.readLeague = function(req, res){
//   res.json(req.league);
// };
//
// module.exports.getAllUsers = function(req, res, next){
//   User.find()
//     .exec(function(err,users){
//       if(err){
//         return next(err);
//       } else {
//         res.json(users);
//       }
//     }
//   );
// };
//
// //==========================\\
// //===== League Members =====\\
// //==========================\\
// module.exports.addMember = function(req, res, next){
//   League.findOne(
//     {'_id':req.league._id})
//     .exec(function(err,league){
//       if(err){
//         return next(err);
//       } else {
//         league.members.push({user_id:req.body.member._id}); //pushes the user's id into the user_id section of the members array
//         league.save(function(err){
//           if(err){
//             return next(err);
//           } else {
//             res.json(league);
//           }
//         });
//       }
//     });
// };
//
// module.exports.getMemberById = function(req, res, next, memberId){
//   League.findOne(
//       {'_id':req.league._id},//search for user's league
//       {'members':{$elemMatch:{'_id':memberId}}}//see if url param for memberId matches the _id in members
//     )
//     .populate('members.user_id')//populate the user information based off the user_id
//     .exec(function(err, member){
//       if(err){
//         return next(err);
//       } if(!member) {
//         return next(new Error('Failed to load member '+ member._id));
//       } else {
//         req.league = member;
//         next();
//       }
//     });
// };
//
// module.exports.readMember = function(req, res){
//   res.json(req.league.members);//return member json
// };
//
// module.exports.updateMember = function(req, res, next){
//   var member = req.league.members; //set the member equal to current user
//   member.save(function(err){
//     if(err){
//       return next(err);
//     } else {
//       res.json(member); //return updated info
//     }
//   });
// };
//
// module.exports.deleteMember = function(req, res, next){
//   var member = req.league.members; //set the member equal to the current member
//   member.remove(function(err){
//     if(err){
//       return next(err);
//     } else {
//       res.json(member); //reutrn updated info
//     }
//   });
// };
//
// module.exports.getMembers = function(req, res){
//   res.json(req.league.members);
// };
//
//
// //============================\\
// //===== League Showdowns =====\\
// //============================\\
//
// module.exports.createShowdowns = function(req, res, next){
//   var showdown = new Showdown(req.body);
//   League.findOne({'_id':req.league._id})
//     .exec(function(err, league){
//       if(err){
//         return next(err);
//       } else {
//         for(var i = 0; i < req.body.weeks; i++){ //loop through amount of weeks
//           if (league.members.length % 2 !== 0) {
//             console.log("You must have an even number of members. You currently have " + league.members.length + " members.");
//           } else {
//             var arr1 = league.members.slice(),
//                 arr2 = league.members.slice();
//
//             arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
//             arr2.sort(function() { return 0.5 - Math.random();});
//
//             var halfArr1 = arr1.length/2;
//
//             for(var j = 0; j < halfArr1; j++) {
//               var member1 = arr1.pop(),
//                   member2 = arr2[0] === member1 ? arr2.pop() : arr2.shift();
//
//               var weekNum = i + 1;
//               showdown.showdowns.push({league_id:req.league._id,week:weekNum,showdownNum:j,competitors:[member1,member2]}); //save pairing information into showdowns array
//             }
//           }
//         }
//         showdown.save(function(err){
//           if(err){
//             return next(err);
//           } else {
//             res.json(league);
//           }
//         });
//       }//end for loop
//     });
//
// };
//
// //returns the week's showdowns in json form
// module.exports.readWeeklyShowdowns = function(req, res){
//   res.json(req.showdowns);
// };
//
// //Finds showdowns for week based on week number parameter
// module.exports.getWeekNum = function(req, res, next, weekNum){
//   var weekNumber = Number(weekNum);
//   // Showdown.find(
//   //     {'showdowns.league_id':req.league._id,'showdowns.week':weekNumber}
//   //   )
//   //   .exec(function(err,showdowns){
//   //     if(err){
//   //       return next(err);
//   //     } else {
//   //       req.showdowns = showdowns; //return showdowns for week
//   //       next();
//   //     }
//   //   });
//   Showdown.aggregate([
//    {$unwind: "$showdowns"},
//    {$match:
//       { $and: [
//         {"showdowns.league_id" : req.league._id} ,
//         {"showdowns.week" : weekNumber} //adding weekNum param returns an empty array
//      ]}
//    },
//    {$project: {"showdowns": 1}}
//  ],function(err, results){
//      if(err){
//        return next(err);
//      } if(!results) {
//        return next(new Error('Failed to load week '+ results._id));
//      } else {
//        Showdown.populate(
//          results,
//          {path:"showdowns.competitors.user_id"},
//          function(error, showdowns){
//            req.showdowns = showdowns;
//            next();
//          });
//
//      }
//    });
//
// };
//
// module.exports.getShowdownByNum = function(req, res, next, showdownNum){
//   var weekNumber = Number(req.showdowns[0].showdowns.week);
//   var showdownNumber = Number(showdownNum);
//   Showdown.findOne(
//       {showdowns:{$elemMatch:{league_id:req.league._id,week:weekNumber,showdownNum:showdownNumber}}},
//       {"showdowns.$":1}
//     )
//     .populate('showdowns.competitors.user_id')
//     .exec(function(err,showdown){
//       if(err){
//         return next(err);
//       } else {
//         req.showdown = showdown;
//         next(); //return showdown
//       }
//     });
// };
//
// module.exports.readShowdown = function(req, res){
//   res.json(req.showdown);
// };
//
// module.exports.updateShowdown = function(req, res){
//   var showdown = req.showdown.showdowns[0];
//   console.log(showdown);
//   showdown.games.push({selections:[{pick:{team:'Home'}}]});
//   showdown.markModified('games');
//   console.log(showdown);
//   showdown.save(function(){
//       res.json(showdown); //return updated showdown info
//   });
// };
//
// //============================\\
// //===== League Standings =====\\
// //============================\\
// module.exports.readStandings = function(req, res){
//   res.json(req.league.standings);
// };
//
// module.exports.getStandings = function(req, res, next){
//   League.findOne(
//       { '_id' : req.league._id }
//     )
//     .exec(function(err, standings){
//       if(err){
//         return next(err);
//       } if(!standings) {
//         return next(new Error('Failed to load member '+ standings._id));
//       } else {
//         res.json(standings);
//       }
//     });
// };
//
// module.exports.getStandingsById = function(req, res, next, memberId){
//   League.findOne(
//       { '_id' : req.league_id },
//       { 'members': { $elemMatch: { '_id': memberId } } }
//     )
//     .exec(function(err, standings){
//       if(err){
//         return next(err);
//       } if(!standings) {
//         return next(new Error('Failed to load member '+ standings._id));
//       } else {
//         req.league = standings;
//         next();
//       }
//     });
// };
