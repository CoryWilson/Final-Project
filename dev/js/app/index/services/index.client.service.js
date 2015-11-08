//File Name: ./dev/js/app/index/services/index.client.service.js

angular.module('index')
  .factory('Index', ['$resource',
  	function($resource) {
  		return {
        NFL    : $resource('/nfl'),
        Soccer : $resource('/soccer/:week',{week:'@week'})
      };
    }
  ]);
