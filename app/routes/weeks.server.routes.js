//File Name: ./app/routes/selections.server.routes.js

var weeksController    = require('../controllers/weeks.server.controller.js'),
    userController = require('../controllers/users.server.controller.js');

module.exports = function(app) {


    app.route('/commissioner')
       .get(userController.commissionerStatus, weeksController.commissionerPanel);
        //commissioner gets possible games to choose from with api calls

    app.route('/commissioner/weeks')
       .get(weeksController.list)
       //list weeks selected
       .post(weeksController.create);
       //commissioner makes picks
       //when submitted it creates collection using selectionsSchema
       //makes it with new weekNum

    app.get('/soccer',weeksController.SoccerScheduleAPI);

    app.route('/commissioner/weeks/:weekNum')
       .get(weeksController.weekByNum);
       //display specific week
       //.put(weeksController.updateWeek)
       //update specific week
       //.delete(weeksController.deleteWeek);
       //delete specific week

    app.param('weekNum',weeksController.weekByNum);
       //api call? most updated info?

};
