var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../../config/config.json')[env];
var tunnel    = require('tunnel-ssh');
var db        = {};

var options = {
  host: process.env.DB_HOST,
  username : process.env.DB_USER,
  password : process.env.SSH_PASS
};

// var server = tunnel(options, function(error, result){
  if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host : process.env.DB_HOST,
      port : process.env.PORT,
      dialict : process.env.DB_DIALECT
    });
  }

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// });

module.exports = db;
