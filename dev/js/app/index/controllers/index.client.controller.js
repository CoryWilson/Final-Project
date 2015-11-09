angular.module('index')
  .controller('IndexController',
    ['$scope', '$routeParams', '$location', 'Index', 'Authentication', 'Facebook', function($scope, $routeParams, $location, Index, Authentication, Facebook){

      $scope.user = Authentication.query({});
      $scope.NFL = Index.NFL.query({});

    }]);
