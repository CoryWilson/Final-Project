var User     = require('mongoose').model('User'),
    passport = require('passport');

exports.list = function(callback){
  User.find({}, function(err, users){
    if(err) {
      return next(err);
    } else {
      var data = JSON.parse(users);

      console.log("Controller: ",data);
      callback(data);z
    }
  });
};

exports.userById = function(req, res, next, id){
  User.findOne({
      _id : id
    },
    function (err, user){
      if(err) {
        return next(err);
      } else {
        req.user = user;
        next();
      }
    }
  );
};

exports.update = function(req, res, next){
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
    if(err) {
      return next(err);
    } else {
      //res.json(user);
      callback(user);
    }
  });
};
