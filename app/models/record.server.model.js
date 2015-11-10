//File Name: ./app/models/record.server.model.js
module.exports = function(sequelize, DataTypes) {
  var Record = sequelize.define('Record', {
    id : {
      type          : DataTypes.INTEGER,
      primaryKey    : true,
      autoIncrement : true
    },
    game_id : {
      type : DataTypes.INTEGER(10),
      allowNull : false
    },
    points : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Record.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Record;
};
