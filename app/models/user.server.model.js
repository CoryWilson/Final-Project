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
  preferences    : {
    username     : String,
    avatar       : String
  },
  showdowns      : [{
    games        : [{
      pick       : String,
      points     : Number
    }]
  }]
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
