//File Name: ./dev/js/app/index/routes/index.client.routes.js

//Determines what routes are used for the game
angular.module('game')
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
      when('/', {
        templateUrl: 'assets/js/app/game/views/view-index.client.view.html'
      }).
      when('/game', {
        templateUrl: 'assets/js/app/game/views/view-games.client.view.html'
      });
    }
]);
