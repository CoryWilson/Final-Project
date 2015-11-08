angular.module('index')
  .controller('IndexController',
    ['$scope', '$routeParams', '$location', 'Index', 'Authentication', 'Facebook', function($scope, $routeParams, $location, Index, Authentication, Facebook){

      $scope.NFL = Index.NFL.query({
        week : '10'
      });

      $scope.Soccer = Index.Soccer.get({
        week : '10'
      });

    }]);
