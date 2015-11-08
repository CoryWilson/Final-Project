//File Name: ./app/models/pick.server.model.js
module.exports = function(sequelize, DataTypes) {
  var Pick = sequelize.define('Pick', {
    pick: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Pick;
};
