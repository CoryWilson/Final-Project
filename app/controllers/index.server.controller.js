//File Name: ./app/controllers/index.server.controller.js
module.exports = function(){
  var _renderIndex = function(req,res) {
    res.render('index', {
    	title: 'Home'
    });
  };
  return {
    renderIndex : _renderIndex
  };
}();
