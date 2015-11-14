//File Name: ./app/controllers/users.server.controller.js
var FB = require('fb');

module.exports = function(){
  //gets user account information
  var _account = function(req, res){
    res.json(req.user);
  };

  //gets user's access token
  //request users profile information with that access token
  var _facebook = function(req, res){
    FB.setAccessToken(req.user.access_token);

    FB.api(
      'me',
      {fields : [
        'first_name',
        'last_name',
        'name',
        'picture.width(500).height(500)',
        'friends{id,first_name,last_name,name,picture.width(500).height(500),favorite_teams}',
        'favorite_teams'
      ]},
      function (response) {
      if (response && !response.error) {
        res.json(response);
      }
    });
  };

  //logs user out
  var _logout = function(req, res) {
  	req.logout();
  	res.redirect('/');
  };

  //checks to see if a user is logged in
  var _requiresAuth = function(req, res, next) {
  	if (!req.isAuthenticated()) {
  		return res.status(401).send({
  			message: 'User is not signed in'
  		});
  	}
  	next();
  };

  return {
    account        : _account,
    facebook       : _facebook,
    logout         : _logout,
    requiresAuth   : _requiresAuth
  };
}();
