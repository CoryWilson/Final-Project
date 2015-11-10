//File Name: ./dev/js/app/game/controllers/game.client.controller.js

//Controller for game module
angular.module('game')
  .controller('GameController',
    ['$scope', '$routeParams', '$location', 'Game', 'Authentication', function($scope, $routeParams, $location, Game, Authentication){

      $scope.getUser = function(){
        $scope.user = Authentication.query({}); //retrieves the user accoutn information
      };

      $scope.getNFLSchedule = function(){
        $scope.NFL = Game.NFL.query({}); //retrieves the current nfl games
      };

      $scope.pickHome = function(game){
        var pick = new Game.Pick({
          game_id : game.id,
          week    : game.week,
          team    : game.home,
          value   : 'home'
        });
        pick.$save();
      };

      $scope.pickAway = function(game){
        var pick = new Game.Pick({
          game_id : game.id,
          week    : game.week,
          team    : game.away,
          value   : 'away'
        });
        pick.$save();
      };

      $scope.sendRecord = function(game){
        var points = 0;
        if(game.home_score > game.away_score && value === 'home' ){
          points = points++;
        }
        if(game.away_score > game.home_score && value === 'away' ){
          points = points++;
        }
        var record = new Game.Record({
          game_id : game.id,
          points  : points
        });
        record.$save();
      };

    }]);
