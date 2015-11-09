//File Name: ./app/models/user.server.model.js
module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('User', {
    id : {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement : true
    },
    facebook_id : {
      type: DataTypes.STRING
    },
    access_token : {
      type: DataTypes.STRING
    },
    firstName : {
      type: DataTypes.STRING
    },
    lastName : {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return User;
};
