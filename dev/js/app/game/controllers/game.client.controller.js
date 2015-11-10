//File Name: ./dev/js/app/game/controllers/game.client.controller.js

//Controller for game module
angular.module('game')
  .controller('GameController',
    ['$scope', '$routeParams', '$location', 'Game', 'Authentication', function($scope, $routeParams, $location, Game, Authentication){

      $scope.user = Authentication.query({}); //retrieves the user accoutn information
      $scope.NFL = Game.NFL.query({}); //retrieves the current nfl games

      $scope.pickHome = function(game){
        console.log(game.week);
        console.log(game.home);
        var pick = new Game.Pick({
          game_id : Number(game.id),
          week    : Number(game.week),
          team    : String(game.home),
          value   : 'Home'
        });
        pick.$save();
      };
      $scope.pickAway = function(game){
        console.log(game);
        var pick = new Game.Pick({
          game_id : Number(game.id),
          week    : Number(game.week),
          team    : String(game.away),
          value   : 'Away'
        });
        pick.$save();
      };

    }]);
