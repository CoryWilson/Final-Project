//File Name: ./dev/js/app/league/controllers/league.client.controller.js

angular.module('league')
  .controller('LeagueController',
    ['$scope', '$routeParams', '$location', 'League', 'Authentication', 'Users', function($scope, $routeParams, $location, League, Authentication, Users){

      $scope.findUser = function(){
        $scope.user = Authentication.get();
      };

      $scope.findAllUsers = function(){
        $scope.users = Users.query();
      };

      $scope.createLeague = function(){
        var league = new League.Overview({
          name : this.name
        });
        league.$save(function(response){
          $location.path('league/'+response.leagueId);
        }, function(errorRes){
          $scope.error = errorRes.data.message;
        });
      };

      $scope.findLeague = function(){
        $scope.league = League.Overview.get({
          leagueId: $routeParams.leagueId
        });
      };

      $scope.findLeagues = function(){
        $scope.leagues = League.Overview.query();
      };

      //Add Member to League
      $scope.addMember = function(){


        var member = new League.Member({
            leagueId : $scope.league._id,
            member   : this.member
        });

        //pass league Id to save function
        member.$save(function(response){
          $location.path('league/'+$scope.league._id+'/members/'+response._id);
        }, function(errorRes){
          $scope.error = errorRes.data.message;
        });

      };

      //Find Members of league
      $scope.findMembers = function(){
        $scope.members = League.Member.query({
          leagueId : $routeParams.leagueId
        });
      };

      //Find specific Member
      $scope.findMember = function(){
        $scope.members = League.Member.get({
          leagueId : $routeParams.leagueId,
          memberId : $routeParams.memberId
        });
        $scope.memberId = memberId;
      };

  }]);
