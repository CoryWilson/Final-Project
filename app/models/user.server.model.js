//File Name: ./app/models/user.server.model.js

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({

  local          : {
    email        : String,
    password     : String
  },
  facebook       : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter        : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  results        : {
    wins         : {
      type: Number,
      default: 0
    },
    ties         : {
      type: Number,
      default: 0
    },
    losses       : {
      type: Number,
      default: 0
    }
  },
  showdowns      : [{
    games        : [{
      pick       : String,
      points     : Number
    }]
  }],
  league         : String,
  username       : String,
  avatar         : String,
  commissioner   : {
  	type: Boolean,
  	default: false
  }

});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
