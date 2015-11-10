//File Name: ./app/controllers/users.server.controller.js
module.exports = function(){
  //gets user account information
  var _account = function(req, res){
    res.json(req.user);
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
    logout         : _logout,
    requiresAuth   : _requiresAuth
  };
}();
