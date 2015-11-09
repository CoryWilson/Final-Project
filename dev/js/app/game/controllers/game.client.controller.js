//File Name: ./dev/js/app/game/controllers/game.client.controller.js

//Controller for game module
angular.module('game')
  .controller('GameController',
    ['$scope', '$routeParams', '$location', 'Game', 'Authentication', function($scope, $routeParams, $location, Game, Authentication){

      $scope.user = Authentication.query({}); //retrieves the user accoutn information
      $scope.NFL = Game.NFL.query({}); //retrieves the current nfl games

    }]);
