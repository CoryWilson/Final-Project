//File Name: ./app/routes/game.server.routes.js
var gameController = require('../controllers/game.server.controller.js');

module.exports = function(app){
  //Create Pick
  app.post('/pick',gameController.createPick);

  //Find all picks
  app.get('/checkPicks',gameController.checkPicks);

  //Send Record
  //app.post('/record',gameController.sendRecord);
};
