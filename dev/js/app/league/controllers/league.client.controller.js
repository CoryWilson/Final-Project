//File Name: ./dev/js/app/league/controllers/league.client.controller.js

angular.module('league')
  .controller('LeagueController',
    ['$scope', '$routeParams', '$location', 'League', 'Authentication', 'Users', function($scope, $routeParams, $location, League, Authentication, Users){

      //===== Users =====\\

      $scope.findUser = function(){
        $scope.user = Authentication.get();
      };

      $scope.findAllUsers = function(){
        $scope.users = Users.query();
      };

      //===== League =====\\

      $scope.createLeague = function(){
        var league = new League.Overview({
          leagueId: $routeParams.leagueId,
          name : this.name
        });
        league.$save(function(response){
          $location.path('league/'+$scope.league._id);
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

      //===== Members =====\

      $scope.addMember = function(){

        var member = new League.Member({
            leagueId : $scope.league._id,
            member   : this.member
        });

        //pass league Id to save function
        member.$save(function(response){
          $location.path('league/'+$scope.league._id+'/members/');
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
        $scope.member = League.Member.query({
          leagueId : $routeParams.leagueId,
          memberId : $routeParams.memberId
        });
      };

      //===== Showdowns =====\\

      $scope.createShowdowns = function(){
        var pairings = new League.Pairings({
            leagueId : $scope.league._id,
            weeks   : this.data.weeks
        });

        //pass league Id to save function
        pairings.$save(function(response){
          $location.path('league/'+$scope.league._id);
        }, function(errorRes){
          $scope.error = errorRes.data.message;
        });
      };

      //Find showdowns in league
      $scope.findShowdowns = function(){
        $scope.showdowns = League.Showdown.query({
          leagueId : $routeParams.leagueId,
          weekNum  : $routeParams.weekNum
        });
      };

      $scope.findShowdown = function(){
        $scope.showdown = League.Showdown.query({
          leagueId   : $routeParams.leagueId,
          weekNum    : $routeParams.weekNum,
          showdownId : $routeParams.showdownNum
        });
      };

  }]);
