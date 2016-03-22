var connection = require('./mysql-connector');

var feedService = {
	getAllFeeds: function(callback) {
		connection.query('SELECT * from feed', callback);
	},

	saveFeed: function(feed, callback) {
		var insertQuery = "INSERT IGNORE INTO feed SET ?";
		console.log(feed);
		connection.query(insertQuery, {
			feed_name: feed.feedName,
			feed_url: feed.feedUrl,
			last_update: new Date()
		}, callback);
	},

	deleteFeedByID: function(feedId, callback) {
		console.log(feedId);
		var deleteQuery = "DELETE from feed WHERE id =" + feedId;
		connection.query(deleteQuery, callback);
	}
};

module.exports = feedService;
