//File Name: ./dev/js/app/game/controllers/game.client.controller.js
//Controller for game module
angular.module('game')
  .controller('GameController',
    ['$scope', '$routeParams', '$location', 'Game', 'Authentication', function($scope, $routeParams, $location, Game, Authentication){

      $scope.moment = moment();

      $scope.getUser = function(){
        $scope.user = Authentication.User.query({}); //retrieves the user accoutn information
        $scope.facebook = Authentication.Facebook.query({});//retrieves the user's facebook information: picture, friends, etc.
      };

      $scope.getLeaderboard = function(){
        $scope.leaderboard = Game.Leaderboard.query({});
      };

      $scope.getNFLSchedule = function(){
        $scope.NFL = Game.NFL.query({}); //retrieves the current nfl games
      };

      $scope.pickGame = function(value){

        var currentTime = moment(); //get current time
        var gameTime = moment.unix(this.game.unix); //get time of game start

        if(moment(currentTime).isAfter(gameTime) === true){ //check if the game has already started
          console.log('you can\'t pick after the game has started'); //don't allow user to make a pick if the game has started
          //possibly use notie here
        } else {
          var team = '';
          if(value === 'home'){
            team = this.game.home;
          } else if (value === 'away'){
            team = this.game.away;
          }
          var pick = new Game.Pick({
            game_id : this.game.id,
            week    : this.game.week,
            unix    : this.game.unix,
            team    : team,
            value   : value
          });
          pick.$save(pick, function(response){
            console.log(response);
          });

        }
      };

    }]);
