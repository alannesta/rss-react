var AppDispatcher = require('../dispatcher/AppDispatcher');
var request = require('superagent');

var FeedActions = {
	fetch: function() {
		request.get('/api/feeds').end(function(req, res) {
			console.log(res);
			AppDispatcher.dispatch({
				actionType: 'FEEDS_INIT',
				feeds: res.body
			});
		});
	},

	selectFeed: function(feed) {
		console.log('why on click');
		AppDispatcher.dispatch({
			actionType: 'SELECT_FEED',
			feed: feed
		});
	}
};

module.exports = FeedActions;
