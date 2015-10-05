//File Name: ./app/modules/api.js
var request = require('request');
var parseString  = require('xml2js').parseString;

//Sportsradar NFL Key = dn99tfdpkq8eyu836hjc2pz9
//Sportsradar EPL Key = vgpmmwsd4jvmps27nrc9h2fv
//Football-Data Key   = c162cb6d7e56493d934b712f58e282f4
//StatsFC Key         = _rTEZZsI666qy0yAOslDCb8yhlUuRBDwYjiC9q6a

//Sportsradar NFL API Call
exports.NFLGameAPI = function(week,away,home,callback){
  var url = 'http://api.sportradar.us/nfl-t1/2015/REG/'+week+'/'+away+'/'+home+'/statistics.json?api_key=dn99tfdpkq8eyu836hjc2pz9';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};

//Football-Data EPL API Call
exports.EPLGameAPI = function(callback){
  request({
    url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday=8',
    headers: {
      'X-Auth-Token' : 'c162cb6d7e56493d934b712f58e282f4'
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      callback(data);
    }
  });
};

exports.CLGameAPI = function(callback){
  request({
    url: 'http://api.football-data.org/alpha/soccerseasons/405/fixtures/?matchday=2',
    headers: {
      'X-Auth-Token' : 'c162cb6d7e56493d934b712f58e282f4'
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
      'X-StatsFC-Key' : '_rTEZZsI666qy0yAOslDCb8yhlUuRBDwYjiC9q6a'
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
  var url = 'http://api.sportradar.us/soccer-t2/eu/matches/2015/10/04/boxscore.xml?api_key=vgpmmwsd4jvmps27nrc9h2fv';
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      parseString(body, function(err, data){
        callback(data);
      });
    }
  });
};
*/
