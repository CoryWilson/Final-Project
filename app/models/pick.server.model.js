//File Name: ./app/models/pick.server.model.js
module.exports = function(sequelize, DataTypes) {
  var Pick = sequelize.define('Pick', {
    id : {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement : true
    },
    game_id : {
      type : DataTypes.INTEGER(10),
      allowNull : false
    },
    value : {
      type : DataTypes.STRING,
      allowNull : false
    },
    week : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
  }, {
    classMethods: {
      associate: function(models) {
        Pick.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Pick;
};
