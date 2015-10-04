//File Name: ./app/routes/routes.js

// var express = require('express');
// var passport = require('passport');
// var router = express.Router();

var User = require('../models/user');

module.exports = function(app, passport){

  //Home
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Home'
    });
  });

  //GET Register
  app.get('/register', function(req, res){
    res.render('register', {
      title  : 'Register',
      message: req.flash('registerMessage')
    });
  });
  //POST Register
  app.post('/register', passport.authenticate('local-register', {
    successRedirect : '/profile',
    failureRedirect : '/register',
    failureFlash    : true
  }));

  //GET Login
  app.get('/login', function(req, res){
    res.render('login', {
      title  : 'Login',
      message: req.flash('loginMessage')
    });
  });
  //POST Login
  app.post('/login', passport.authenticate('local-login', {
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
