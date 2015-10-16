angular.module('weeks')
  .factory('SoccerAPI', ['$resource',
  	function($resource) {
      var soccer = $resource("http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday=8",
      {
        //params would go here
        //leagueId : ,
        //weekId : 
      },{
        query: {
          method: 'GET',
          headers: {
            'X-Auth-Token' : 'c162cb6d7e56493d934b712f58e282f4'
          }
        }
      });
      return soccer;
    }
]);
