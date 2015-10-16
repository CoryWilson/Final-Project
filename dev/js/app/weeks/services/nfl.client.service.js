angular.module('weeks')
  .factory('NflAPI', ['$resource',
  	function($resource) {
      var nfl = $resource("http://api.sportradar.us/nfl-t1/2015/REG/5/schedule.json?api_key=dn99tfdpkq8eyu836hjc2pz9",
      {
        //params would go here
        //weekId :
        //dn99tfdpkq8eyu836hjc2pz9
      },{
        query: {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin':'*'
          }
        }
      });
      return nfl;
    }
]);
