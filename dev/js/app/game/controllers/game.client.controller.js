//File Name: ./dev/js/app/game/controllers/game.client.controller.js

//Controller for game module
angular.module('game')
  .controller('GameController',
    ['$scope', '$routeParams', '$location', 'Game', 'Authentication', function($scope, $routeParams, $location, Game, Authentication){


      $scope.getUser = function(){
        $scope.user = Authentication.User.query({}); //retrieves the user accoutn information
        $scope.facebook = Authentication.Facebook.query({});//retrieves the user's facebook information: picture, friends, etc.
      };

      $scope.getLeaderboard = function(){
        $scope.leaderboard = Game.Leaderboard.query({});
      };

      $scope.getNFLSchedule = function(){
        $scope.NFL = Game.NFL.query({}); //retrieves the current nfl games
      };

      $scope.pickGame = function(value){
        console.log(this.game);
        console.log(value);
        var team = '';
        if(value === 'home'){
          team = this.game.home;
        } else if (value === 'away'){
          team = this.game.away;
        }
        var pick = new Game.Pick({
          game_id : this.game.id,
          week    : this.game.week,
          team    : team,
          value   : this.value
        });
        pick.$save(pick, function(response){
          console.log(response);
        });
      };

    }]);
