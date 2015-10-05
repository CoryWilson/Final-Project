//File Name: ./app/models/user.js

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

  local         : {
    email       : String,
    password    : String,
    commisioner : Boolean,
    username    : String,
    avatar      : String,
    league      : String
  }

});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
