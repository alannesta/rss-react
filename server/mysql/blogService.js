var connection = require('./mysql-connector');

var feedService = {
	getAllBlogs: function(callback) {
		connection.query('SELECT * from blogs', callback)
	}
};

module.exports = feedService;
