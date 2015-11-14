//File Name: ./dev/js/app/app.js

//Declare angular application name
var appName = 'showdownSports';
//Declare application and associated modules
var app = angular.module(appName, ['ngResource', 'ngRoute', 'game', 'users']);

//Set hashPrefix to !
app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
