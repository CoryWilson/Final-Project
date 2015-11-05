//File Name: ./app/models/league.server.model.js

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

leagueSchema = new Schema({
  name      : String,
  members   : [{
    user_id: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  }],
  standings : {
    members : [{
      user_id: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      results : {
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
      }
    }]
  }
});

module.exports = mongoose.model('League', leagueSchema);
