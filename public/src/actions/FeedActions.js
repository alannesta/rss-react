var AppDispatcher = require('../dispatcher/AppDispatcher');
var request = require('superagent');
var FeedUtil = require('../feedUtil');

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
		AppDispatcher.dispatch({
			actionType: 'SELECT_FEED',
			feed: feed
		});
	},

	fetchContent: function(url) {
		FeedUtil.loadFeed(url).then(function(content) {
			AppDispatcher.dispatch({
				actionType: 'CONTENT_LOADED',
				content: content
			});
		});
	}
};

module.exports = FeedActions;
