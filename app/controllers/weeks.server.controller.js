var Week = require('mongoose').model('Week');
var Api  = require('../modules/api');
var soccerLeagues = require('../../config/soccerLeagues');
var configAPI    = require('../../config/apiKeys.js');
var request      = require('request');

exports.list = function(req, res){
  Week.find({},
    function(err, results){
      if(err){
        return next(err);
      } else {
        res.json(results);
      }
    }
  );
};

exports.create = function(req, res){
  var week = new Week(req.body);
  week.creator = req.user;
  week.save(function(err,result){
    res.json(result);
  });
};

exports.commissionerPanel = function(req, res){
  Api.SoccerScheduleAPI(soccerLeagues.premierLeague,'5', function(soccerData){
    res.render('commissioner',{
      title: 'Commissioner Panel',
      user : req.user,
      soccerData : soccerData
    });
  });
};

exports.weekByNum = function(req, res, next, weekNum){
  Week.find({
      weekNum: weekNum
    },
    function(err, result){
      if(err) {
        return next(err);
      } else {
        res.json(result);
      }
    }
  );
};

exports.SoccerScheduleAPI = function(req, res){

  request({
    url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday=8',
    headers: {
      'X-Auth-Token' : 'c162cb6d7e56493d934b712f58e282f4'
    }
  }, function(err, result) {
    if(err){
      return next(err);
    } else {
      res.json(result);
    }
  });

};
