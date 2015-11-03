var appName = 'showdownSports';
var app = angular.module(appName, ['ngResource', 'ngRoute', 'index', 'weeks', 'users', 'league']);

app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
