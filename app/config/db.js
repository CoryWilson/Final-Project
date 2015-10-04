//File Name: ./app/config/db.js

var mongoose = require('mongoose');

var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/showdown_sports';

mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});
