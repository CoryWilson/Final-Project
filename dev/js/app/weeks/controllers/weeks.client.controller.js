angular.module('weeks')
  .controller('WeeksController',
    ['Weeks', 'SoccerAPI', 'NflAPI', 'Authentication', '$scope', '$resource', '$location', function(Weeks, SoccerAPI, NflAPI, Authentication, $scope, $resource, $location){

      $scope.findUser = function(){
        $scope.user = Authentication.get();
      };

      $scope.find = function(){
        $scope.weeks = Weeks.query();
      };

      // $scope.findWeek = function(){
      //   $scope.week = Weeks.get({
      //     weekNum: $routeParams.weekNum
      //   });
      // };

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
          $location.path('/commissioner/weeks/'+result.weekNum);
        },  function(errorRes) {
          $scope.error = errorRes.data.message;
        });
        //   $scope.weeks = [];
        //   $scope.weeks.push(result);
        // });
      };

      $scope.updateWeek = function(){
        $scope.week.$update(function(){
          $location.path('commissioner/weeks/'+$scope.week.weekNum);
        }, function(errorRes){
          $scope.error = errorRes.data.message;
        });
      };

      $scope.delete = function(week) {
			if (week) {
				week.$remove(function() {
					for (var i in $scope.weeks) {
						if ($scope.weeks[i] === week) {
							$scope.weeks.splice(i, 1);
						}
					}
				});
			} else {
				$scope.week.$remove(function() {
					$location.path('weeks');
				});
			}
		};

}]);
