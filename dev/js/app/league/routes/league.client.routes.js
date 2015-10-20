//File Name: ./dev/js/app/league/routes/league.client.routes.js

angular.module('league')
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
      when('/league', {
        templateUrl: 'assets/js/app/league/views/list-leagues.client.view.html'
      }).
      when('/league/create', {
        templateUrl: 'assets/js/app/league/views/create-league.client.view.html'
      }).
      when('/league/:leagueId', {
        templateUrl: 'assets/js/app/league/views/view-league.client.view.html'
      }).
      when('/league/:leagueId/members', {
        templateUrl: 'assets/js/app/league/views/list-members-league.client.view.html'
      }).
      when('/league/:leagueId/members/create', {
        templateUrl: 'assets/js/app/league/views/add-member-league.client.view.html'
      }).
      when('/league/:leagueId/members/:memberId', {
			templateUrl: 'assets/js/app/league/views/view-member-league.client.view.html'
  		}).
  		when('/league/:leagueId/members/:memberId/edit', {
  			templateUrl: 'assets/js/app/league/views/edit-member-league.client.view.html'
  		});
    }
]);
