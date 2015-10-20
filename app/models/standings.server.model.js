//File Name: ./app/models/standings.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var standingsSchema = new Schema({

  players       : [{
    user        : {
  		type : Schema.ObjectId,
  		ref  : 'User'
    },
    results     : {
      wins      : {
        type : Number,
        default : 0
      },
      ties      : {
        type : Number,
        default : 0
      },
      losses    : {
        type : Number,
        default : 0
      },
      points    : {
        type : Number,
        default : 0
      }
    },
  }],
  league        : String

});

module.exports = mongoose.model('Standings', standingsSchema);
