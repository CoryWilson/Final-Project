//File Name: ./app/controllers/index.server.controller.js

exports.render = function(req, res) {
    res.render('index', {
    	title: 'Home',
    	user: JSON.stringify(req.user)
    });
};
