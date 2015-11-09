//File Name: ./app/controllers/users.server.controller.js
module.exports = function(){

  //renders login view
  var _renderSignIn = function(req, res) {
  	res.render('sign-in', {
  		title: 'Sign In'
  	});
  };

  //logs user out
  var _logout = function(req, res) {
  	req.logout();
  	res.redirect('/');
  };

  var _account = function(req, res){
    res.json(req.user);
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
    renderSignIn   : _renderSignIn,
    logout         : _logout,
    account        : _account,
    requiresAuth   : _requiresAuth
  };
}();
