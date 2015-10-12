//File Name: ./app/controllers/showdownSelections.server.controller.js
var ShowdownSelection = require('mongoose').model('ShowdownSelection');

exports.create = function(req, res){
  var showdownSelection     = newShowdownSelection(req.body);
  showdownSelection.creator = req.user;
  showdownSelection.save(function(err){
    if(err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(showdownSelection);
    }
  });
};

exports.list = function(req, res) {
	ShowdownSelection.find()
    .sort('-created')
    .populate('creator', 'local.email')
    .exec(function(err, showdownSelections) {
  		if (err) {
  			return res.status(400).send({
  				message: getErrorMessage(err)
  			});
  		} else {
  			res.json(showdownSelections);
  		}
	});
};

exports.read = function(req, res) {
	res.json(req.showdownSelection);
};

exports.showdownSelectionById = function(req, res, next, id) {
	ShowdownSelection.findById(id)
    .populate('creator', 'local.email')
    .exec(function(err, showdownSelection) {
  		if (err) {
        return next(err);
      }
  		if (!showdownSelection) {
        return next(new Error('Failed to load showdownSelection ' + id));
      }
  		req.showdownSelection = showdownSelection;
  		next();
	});
};

exports.update = function(req, res) {
	var showdownSelection       = req.showdownSelection;
	showdownSelection.title     = req.body.title;
	showdownSelection.comment   = req.body.comment;
	showdownSelection.completed = req.body.completed;

	showdownSelection.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(showdownSelection);
		}
	});
};

exports.delete = function(req, res) {
	var showdownSelection = req.showdownSelection;
	showdownSelection.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(showdownSelection);
		}
	});
};
