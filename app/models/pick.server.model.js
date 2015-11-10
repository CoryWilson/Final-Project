//File Name: ./app/models/pick.server.model.js
module.exports = function(sequelize, DataTypes) {
  var Pick = sequelize.define('Pick', {
    id : {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement : true
    },
    week : {
      type : DataTypes.INTEGER,
    },
    game_id : {
      type : DataTypes.INTEGER(10),
      allowNull : false
    },
    team : {
      type : DataTypes.STRING
    },
    value : {
      type : DataTypes.STRING,
      allowNull : false
    }
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
