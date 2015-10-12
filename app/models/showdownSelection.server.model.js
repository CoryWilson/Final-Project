//File Name: ./app/models/showdownSelection.server.model.js

var mongoose = require('mongoose'),
	  Schema   = mongoose.Schema;

var ShowdownSelectionSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	gameRef: {
		type : String
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	completed: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('ShowdownSelection', ShowdownSelectionSchema);
