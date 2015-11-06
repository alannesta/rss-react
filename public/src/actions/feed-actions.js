var AppDispatcher = require('../dispatcher/AppDispatcher');
var request = require('superagent');
var FeedUtil = require('../feedUtil');

var FeedActions = {
	fetch: function() {
		request.get('/api/feeds').end(function(req, res) {
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
				actionType: 'SHOW_MODAL',
				feed: {
					name: feedName,
					feedUrl: val
				}
			})
		}, function(err) {
			console.log(err);
		})
	},

	subscribeFeed: function(feed) {
		var actions = this;
		console.log('subscribed');
		request.post('/api/feed')
			.send(feed)
			.end(function(req, res) {
				// refresh the feed list when success
				actions.fetch();
			})
	}
};

module.exports = FeedActions;
