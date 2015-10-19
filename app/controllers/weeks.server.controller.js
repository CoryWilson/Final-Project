var Week = require('mongoose').model('Week');

var getErrorMessage = function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res){
  var week = new Week(req.body);
  week.creator = req.user;
  week.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(week);
    }
  });
};

exports.list = function(req, res){
  Week.find({},
    function(err, weeks){
      if(err){
        return res.status(400).send({
        message: getErrorMessage(err)
      });
      } else {
        res.json(weeks);
      }
    }
  );
};

exports.read = function(req, res){
  res.json(req.week);
};

exports.weekById = function(req, res, next, id){
  Week.findById(id)
    .populate('creator','username')
    .exec(function(err, week){
      if(err)
        return next(err);
      if(!week)
        return next(new Error('Failed to load week '+id));

        req.week = week;
        next();
    });
};

exports.update = function(req, res){
  var week = req.week;
  week.weekNum = req.body.weekNum;
  week.games = req.body.games;

  week.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(week);
    }
  });
};

exports.delete = function(req, res){
  var week = req.week;
  week.remove(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(week);
    }
  });
};
