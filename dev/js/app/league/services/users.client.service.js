//File Name: ./dev/js/app/league/services/users.client.service.js

angular.module('league')
  .factory('Users', ['$resource',
  	function($resource) {
  		return $resource('/userList');
  }
]);
