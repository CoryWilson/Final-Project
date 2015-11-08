//File Name: ./app/controllers/api.server.controller.js
var request = require('request');

module.exports = function(){
  var _readNFLAPI = function(req,res){
    request
      .post({url:'https://profootballapi.com/schedule?api_key='+process.env.NFL_API_KEY+'&year=2015&week=9&season_type=REG'},
        function(err, httpResponse, body){
          if(err){
            console.log(err);
          }
          res.send(body);
        }
    );
  };

  var _readSoccerAPI = function(req,res){
    var options = {
      url : 'http://api.football-data.org/alpha/soccerseasons/398/fixtures?matchday=12',
      headers : {
        'X-Auth-Token' : process.env.SOCCER_API_KEY
      }
    };
    request
      .get(options,
        function(err, httpResponse, body){
          if(err){
            return console.log(err);
          }
          res.send(body);
        }
    );
  };

  return {
    readNFLAPI    : _readNFLAPI,
    readSoccerAPI : _readSoccerAPI
  };
}();
