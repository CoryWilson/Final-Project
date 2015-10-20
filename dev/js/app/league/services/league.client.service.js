//File Name: ./dev/js/app/league/services/league.client.service.js

angular.module('league')
  .factory('League', ['$resource',
  	function($resource) {
  		return {
        Overview : $resource('/league/:leagueId',
                     { leagueId : '@leagueId' },
                     { update : { method : 'PUT' } }
                   ),
        Member   : $resource('/league/:leagueId/members/:memberId',
                     { leagueId: '@leagueId', memberId: '@memberId'},
                     { update : { method : 'PUT'}}
                   )
      };
    }
  ]);
