angular.module('weeks')
  .factory('Weeks', ['$resource',
  	function($resource) {
  		return $resource('/commissioner/weeks');
    }
]);
