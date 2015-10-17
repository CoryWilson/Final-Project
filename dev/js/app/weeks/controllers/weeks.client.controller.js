angular.module('weeks')
  .controller('WeeksController',
    ['$scope', '$routeParams', '$location', 'Weeks', 'SoccerAPI', 'NflAPI', 'Authentication', function($scope, $routeParams, $location, Weeks, SoccerAPI, NflAPI, Authentication){

      $scope.findUser = function(){
        $scope.user = Authentication.get();
      };

      $scope.getAPIs = function (){
        $scope.soccerCall = SoccerAPI.query();
        $scope.nflCall = NflAPI.query();
      };

      $scope.create = function(){

        var week = new Weeks({
          weekNum: this.weekNum,
          games: this.games
        });

        week.$save(function(response){
         $location.path('weeks/'+response._id);
        }, function(errorRes) {
          $scope.error = errorRes.data.message;
        });

        //week.weekNum = $scope.weekNum;
        //   $scope.weeks = [];
        //   $scope.weeks.push(result);
        // });

      };

      $scope.find = function(){
        $scope.weeks = Weeks.query();
      };

      $scope.findWeek = function(){
        $scope.week = Weeks.get({
          weekId: $routeParams.weekId
        });
      };

      $scope.update = function(){
        $scope.week.$update(function(){
          $location.path('weeks/'+$scope.week._id);
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
