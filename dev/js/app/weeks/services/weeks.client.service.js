angular.module('weeks')
  .factory('Weeks', ['$resource',
  	function($resource) {
  		return $resource('commissioner/weeks/:weekId',{
        weekId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
]);
