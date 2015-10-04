//File Name: ./app/routes/routes.js
var User = require('../models/user.js');
var api  = require('../modules/api.js');

var request = require('request');

module.exports = function(app, passport){

  //Home
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Home'
    });
  });

  //Register Routes
  app.route('/register')
  //GET
  .get(function(req, res){
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
  .get(function(req, res){
    res.render('login', {
      title  : 'Login',
      message: req.flash('loginMessage')
    });
  })
  //POST
  .post(passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash    : true
  }));

  //Profile
  app.get('/profile', userAuthenticated, function(req,res){
    res.render('profile', {
      title: 'Profile',
      user : req.user
    });
  });

  //Showdown
  app.get('/showdown', userAuthenticated, function(req,res){
    api.NFLGameAPI('4','HOU','ATL',function(nflData){
      api.EPLGameAPI(function(eplData){
        api.CLGameAPI(function(clData){
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
    api.EPLGameAPI(function(data){
      res.render('test',{
        title : 'Test',
        data  : data
      });
    });
  });

  //Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
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
function attachAuthStatus(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
}
