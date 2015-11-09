angular.module('users')
  .factory('Authentication', ['$resource',
  	function($resource) {
      return $resource('/account',{},{ query : { method : 'POST'} });
    }
]);
