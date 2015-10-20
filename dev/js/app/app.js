var appName = 'showdownSports';
var app = angular.module(appName, ['ngResource', 'ngRoute', 'weeks', 'users', 'league']);

app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
