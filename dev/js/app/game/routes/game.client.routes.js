//File Name: ./dev/js/app/index/routes/index.client.routes.js

//Determines what routes are used for the game
//Replies with appropriate view
angular.module('game')
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
      when('/', {
        templateUrl: 'assets/js/app/game/views/view-index.client.view.html'
      }).
      when('/game', {
        templateUrl: 'assets/js/app/game/views/view-games.client.view.html'
      }).
      when('/leaderboard', {
        templateUrl: 'assets/js/app/game/views/view-leaderboard.client.view.html'
      }).
      when('/profile', {
        templateUrl: 'assets/js/app/game/views/view-profile.client.view.html'
      });
    }
]);
