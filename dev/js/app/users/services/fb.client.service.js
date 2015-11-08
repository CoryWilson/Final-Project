//File Name: ./dev/js/app/users/services/fb.client.service.js

angular.module('users')
  .factory('Facebook', function($q){
    return {
      getLastName : function(){
        var deferred = $q.deferred();
        FB.api('/me', {
          fields: 'last_name'
        }, function(response){
          if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
        });
        return deferred.promise;
      }
    };
  });
