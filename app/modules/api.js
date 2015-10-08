//File Name: ./app/modules/api.js

var request      = require('request');
var parseString  = require('xml2js').parseString;

var configAPI    = require('../config/apiKeys.js');

/***** Game Stats API Calls *****/

//Sportsradar NFL Game Stats API Call
exports.NFLGameAPI = function(week,away,home,callback){
  var url = 'http://api.sportradar.us/nfl-t1/2015/REG/'+week+'/'+away+'/'+home+'/statistics.json?api_key='+configAPI.sportsradarNFL.key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};

//Football-Data EPL Game Stats API Call
exports.EPLGameAPI = function(callback){
  request({
    url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday=8',
    headers: {
      'X-Auth-Token' : configAPI.footballData.key
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};

//Football-Data CL Game Stats API Call
exports.CLGameAPI = function(callback){
  request({
    url: 'http://api.football-data.org/alpha/soccerseasons/405/fixtures/?matchday=2',
    headers: {
      'X-Auth-Token' : configAPI.footballData.key
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};

/***** Schedule API Calls *****/
//Sportsradar NFL Schedule Call
exports.NFLScheduleAPI = function(week,callback){
  var url = 'http://api.sportradar.us/nfl-t1/2015/REG/'+week+'/schedule.json?api_key='+configAPI.sportsradarNFL.key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};

//Football-Data EPL Weekly Schedule API Call
exports.SoccerScheduleAPI = function(league,week,callback){
  request({
    url: 'http://api.football-data.org/alpha/soccerseasons/'+league+'/fixtures/?matchday='+week,
    headers: {
      'X-Auth-Token' : configAPI.footballData.key
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};


//Football-Data CL Game Stats API Call
exports.CLGameAPI = function(callback){
  request({
    url: 'http://api.football-data.org/alpha/soccerseasons/405/fixtures/?matchday=2',
    headers: {
      'X-Auth-Token' : configAPI.footballData.key
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};

/*
//StatsFC EPL API Call
exports.EPLGameAPI = function(callback){
  request({
    url: 'https://dugout.statsfc.com/api/v1/results',
    headers: {
      'X-StatsFC-Key' : configAPI.statsFC.key
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};
*/

/*
//Sportsradar EPL API Call
exports.EPLGameAPI = function(callback){
  var url = 'http://api.sportradar.us/soccer-t2/eu/matches/2015/10/04/boxscore.xml?api_key='+configAPI.sportsradarEPL.key;
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      parseString(body, function(err, data){
        callback(data);
      });
    }
  });
};
*/
