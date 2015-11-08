var AppDispatcher = require('../dispatcher/AppDispatcher');
var request = require('superagent');
var FeedUtil = require('../feedUtil');

var FeedActions = {
	fetch: function() {
		request.get('/api/feeds').end(function(error, res) {
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
				content: {
					name: feedName,
					feedUrl: val
				},
				modalType: 'ADD_FEED'
			})
		}, function(err) {
			console.log(err);
			AppDispatcher.dispatch({
				actionType: 'SHOW_MODAL',
				content: 'Could not find feed, check your URL',
				modalType: 'ERROR'

			})
		})
	},

	subscribeFeed: function(feed) {
		var actions = this;
		console.log('subscribed');
		request.post('/api/feed')
			.send(feed)
			.end(function(err, res) {
				// refresh the feed list when success
				actions.fetch();
				if (err) {
					AppDispatcher.dispatch({
						actionType: 'SHOW_MODAL',
						content: 'Fail to subscribe to feed',
						modalType: 'ERROR'
					});
				}
			})
	},

	toggleFeedActions: function(feed) {
		AppDispatcher.dispatch({
			actionType: 'TOGGLE_FEED_ACTIONS',
			feed: feed,
			showActions: !feed.showActions
		})
	}
};

module.exports = FeedActions;
