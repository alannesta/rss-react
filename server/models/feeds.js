var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	feedUrl: {
		type: String,
		unique: true,
		required: true
	},
	name: String,
	logoUrl: String
});
