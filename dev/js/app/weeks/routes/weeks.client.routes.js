angular.module('weeks')
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
      when('/commissioner/weeks', {
        templateUrl: 'weeks/views/list-weeks.client.view.html'
      }).
      when('/commissioner/weeks/create', {
        templateUrl: 'weeks/views/create-week.client.view.html'
      }).
      when('/commissioner/weeks/:weekNum', {
			templateUrl: 'weeks/views/view-week.client.view.html'
  		}).
  		when('/commissioner/weeks/:weekNum/edit', {
  			templateUrl: 'weeks/views/edit-week.client.view.html'
  		});
    }
]);
