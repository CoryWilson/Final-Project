//File Name: ./app/controllers/picks.server.controller.js
var models = require('../models');

var log = function(inst){
  console.dir(inst.get());
};

models.Pick.findAll({})
  .then(function(picks){
    picks.forEach(log);
  });
