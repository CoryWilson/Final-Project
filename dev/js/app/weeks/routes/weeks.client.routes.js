angular.module('weeks')
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
      when('/weeks', {
        templateUrl: 'assets/js/app/weeks/views/list-weeks.client.view.html'
      }).
      when('/weeks/create', {
        templateUrl: 'assets/js/app/weeks/views/create-week.client.view.html'
      }).
      when('/weeks/:weekId', {
			templateUrl: 'assets/js/app/weeks/views/view-week.client.view.html'
  		}).
  		when('/weeks/:weekId/edit', {
  			templateUrl: 'assets/js/app/weeks/views/edit-week.client.view.html'
  		});
    }
]);
