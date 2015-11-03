//File Name: ./dev/js/app/league/services/api.client.service.js

angular.module('league')
  .factory('API', ['$resource',
  	function($resource) {
      return {
        Soccer : $resource('http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday=8',
          { soccerLeague : '@soccerLeague', matchday : '@matchday' },
          { query: {
              method: 'GET',
              headers: {
                'X-Auth-Token' : 'c162cb6d7e56493d934b712f58e282f4'
              }
            }
          }
        ),
        NFL : $resource('http://api.sportradar.us/nfl-t1/2015/REG/5/schedule.json?api_key=dn99tfdpkq8eyu836hjc2pz9',
          {week: '@week'},
          {
            query: {
              method: 'GET',
              headers: {
                'Access-Control-Allow-Origin':'*'
              }
            }
          }
        )
      };
  }
]);
