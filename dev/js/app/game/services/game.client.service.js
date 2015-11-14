//File Name: ./dev/js/app/index/services/index.client.service.js

//Module that triggers external api request
//Makes get request on the /nfl route which makes a request to the nfl schedule api for current week
angular.module('game')
  .factory('Game', ['$resource',
  	function($resource) {
  		return {
        NFL         : $resource('/nfl'),
        Pick        : $resource('/pick'),
        Record      : $resource('/record'),
        Leaderboard : $resource('/leaderboard')
      };
    }
  ]);
