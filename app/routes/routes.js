//File Name: ./app/routes/routes.js
var User      = require('../models/user.js');
var users     = require('../controllers/users.server.controller.js');
var Api       = require('../modules/api.js');
//var League    = require('../models/league.js');
var Standings = require('../modules/Standings.js');
var Showdowns  = require('../modules/showdown.js');

var request = require('request');
var soccerLeagues = require('../config/soccerLeagues.js');

module.exports = function(app, passport){

  //Home
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Home'
    });
  });

  //===================================================
  // Register & Login Routes
  //===================================================

  //Register Routes
  app.route('/register')
  //GET
  .get( function(req, res){
    res.render('register', {
      title  : 'Register',
      message: req.flash('registerMessage')
    });
  })
  //POST Register
  .post(passport.authenticate('local-register', {
    successRedirect : '/profile',
    failureRedirect : '/register',
    failureFlash    : true
  }));

  //Login Routes
  app.route('/login')
  //GET
  .get( function(req, res){
    res.render('login', {
      title  : 'Login',
      message: req.flash('loginMessage')
    });
  })
  //POST
  .post(passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash    : true
  }));

  //Facebook Routes
  app.get('/auth/facebook',
    passport.authorize('facebook',{scope:'public_profile,email'}));

  app.get('/auth/facebook/callback',
    passport.authorize('facebook',{
      successRedirect : '/profile',
      failureRedirect : '/register'
    })
  );

  //Profile
  app.get('/profile', userAuthenticated, function(req,res){
    res.render('profile', {
      title: 'Profile',
      user : req.user
    });
  });

  //Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  //===================================================
  // End Register & Login Routes
  //===================================================


  app.get('/standings', function(req,res){
    //standings.findStandings(function(err,standings){
      res.render('standings',{
        title : 'Standings',
        //data  : standings
      });
    //});
  });

  //Commisioner Selection
  //isCommisioner function
  app.get('/selection', function(req, res){
    Api.NFLScheduleAPI('5',function(nflData){
      Api.SoccerScheduleAPI(premierLeague, '9', function(eplData){
        Api.SoccerScheduleAPI(championsLeague, '3', function(clData){
          res.render('selection', {
            title   : 'Selection',
            nflData : nflData,
            eplData : eplData,
            clData  : clData
          });
        });
      });
    });
  });

  //Showdown
  app.get('/showdown', userAuthenticated, function(req,res){
    Api.NFLGameAPI('4','HOU','ATL',function(nflData){
      Api.EPLGameAPI(function(eplData){
        Api.CLGameAPI(function(clData){
          res.render('showdown',{
            title   : 'Showdown',
            user    : req.user,
            nflData : nflData,
            eplData : eplData,
            clData  : clData
          });
        });
      });
    });
  });

  //Chat
  app.get('/chat', userAuthenticated, function(req,res){
    res.render('chat', {
      title: 'Chat',
      user : req.user
    });
  });

  app.get('/test', function(req,res){
    Api.SoccerScheduleAPI(soccerLeagues.laLiga,'8',function(data){
      res.render('test',{
        title : 'Test',
        data  : data
      });
    });
  });

  // app.get('/leagueTest', function(req,res){
  //   League.find(function(err,data){
  //     res.render('test',{
  //       title : 'League',
  //       data  : data
  //     });
  //   });
  // });

  app.get('/standingsTest', function(req,res){
    Standings.findStandings(function(err,data){
      res.render('test',{
        title : 'Standings',
        data  : data
      });
    });
  });

  app.get('/showdownTest', function(req,res){
    Showdowns.findShowdowns(function(err,data){
      res.render('test',{
        title : 'Showdowns',
        data  : data
      });
    });
  });


  app.get('/users',function(req,res){
    users.list(function(err,data){

      console.log("Route: ",data);
      res.render('test',{
        title: 'Users',
        data : data
      });
    });
  });

  // app.route('/users/:userId')
  //   .get(users.read)
  //   .put(users.update)
  //   .delete(users.delete);

  app.param('userId', users.userById);


};

function userAuthenticated(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }else{
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}
