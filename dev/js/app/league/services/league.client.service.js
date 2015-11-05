//File Name: ./dev/js/app/league/services/league.client.service.js

angular.module('league')
  .factory('League', ['$resource',
  	function($resource) {
  		return {
        Overview  : $resource('/league/:leagueId',
                     { leagueId : '@leagueId' },
                     { update : { method : 'PUT' } }
                    ),
        Member    : $resource('/league/:leagueId/members/:memberId',
                     { leagueId : '@leagueId', memberId : '@memberId'},
                     { update : { method : 'PUT'} }
                    ),
        Showdowns : $resource('/league/:leagueId/showdowns/:weekNum',
                     { leagueId : '@leagueId', weekNum: '@weekNum'},
                     { update : { method : 'PUT'} }
                    ),
        Showdown  : $resource('/league/:leagueId/showdowns/:weekNum/:showdownNum',
                     { leagueId : '@leagueId', weekNum : '@weekNum', showdownNum : '@showdownNum' },
                     { update : { method : 'PUT' } }
                    ),
        Standings : $resource('/league/:leagueId/standings/',
                     { leagueId : '@leagueId' }
                    )
      };
    }
  ]);
