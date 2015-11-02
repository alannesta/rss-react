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
		FeedUtil.loadFeed(feed.feedUrl).then(function(content) {
			AppDispatcher.dispatch({
				actionType: 'SELECT_FEED',
				feed: feed,
				content: content
			});
		});
	},

	searchFeed: function(val) {
		FeedUtil.getFeedInfo(val).then(function(feedName) {
			AppDispatcher.dispatch({
				actionType: 'CONFIRM_MODAL',
				feed: {
					name: feedName,
					url: val
				}
			})
		})
	}
};

module.exports = FeedActions;
