//File Name: ./dev/js/app/users/services/authenticaiton.client.service.js

//module that retrieves user account information from the /account post route using ng-resource
angular.module('users')
  .factory('Authentication', ['$resource',
  	function($resource) {
      return $resource('/account',{},{ query : { method : 'POST'} });
    }
]);
