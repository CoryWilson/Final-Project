//File Name: ./app/routes/picks.server.routes.js
var picksController = require('../controllers/picks.server.controller.js');

module.exports = function(app){
  //Create Pick
  app.post('/pick',picksController.createPick);

  //Find all picks
  app.get('/picks',picksController.findPicks);
};
