//File Name: ./dev/js/app/index/routes/index.client.routes.js

angular.module('index')
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
      when('/', {
        templateUrl: 'assets/js/app/index/views/view-index.client.view.html'
      });
    }
]);
