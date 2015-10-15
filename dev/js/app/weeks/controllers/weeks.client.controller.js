angular.module('weeks')
  .controller('WeeksController',
    ['Weeks','SoccerAPI','Authentication','$scope','$resource', '$http', function(Weeks, SoccerAPI, Authentication, $scope, $resource, $http){


      $scope.find = function(){
        $scope.weeks = Weeks.query();
      };

      $scope.getSoccer = function (){
        $scope.soccerCall = SoccerAPI.query();
      };

      $scope.createWeek = function(){

        var week = new Weeks({
          weekNum: this.weekNum,
          games: [
            this.games
          ]
        });

        //week.weekNum = $scope.weekNum;
        week.$save(function(result){
          console.log(result);
          $scope.weeks.push(result);
        });

      };

}]);
