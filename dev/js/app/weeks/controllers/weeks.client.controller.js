angular.module('weeks')
  .controller('WeeksController',
    ['Weeks', 'SoccerAPI', 'NflAPI', 'Authentication', '$scope', '$resource', '$http', function(Weeks, SoccerAPI, NflAPI, Authentication, $scope, $resource, $http){

      $scope.findUser = function(){
        $scope.user = Authentication.get();
      };

      $scope.find = function(){
        $scope.weeks = Weeks.query();
      };

      $scope.getAPIs = function (){
        $scope.soccerCall = SoccerAPI.query();
        // console.log($scope.soccerCall);
        $scope.nflCall = NflAPI.query();
        //console.log($scope.nflCall);
      };

      $scope.createWeek = function(){

        var week = new Weeks({
          weekNum: this.weekNum,
          games: this.games
        });

        //week.weekNum = $scope.weekNum;
        week.$save(function(result){
          $scope.weeks = [];
          $scope.weeks.push(result);
        });

      };

}]);
