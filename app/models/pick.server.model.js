//File Name: ./app/models/pick.server.model.js
module.exports = function(sequelize, DataTypes) {
  var Pick = sequelize.define('Pick', {
    id : {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement : true
    },
    pick: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Pick;
};
