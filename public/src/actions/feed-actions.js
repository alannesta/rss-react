var AppDispatcher = require('../dispatcher/AppDispatcher');
var FeedUtil = require('../feedUtil');

var FeedActions = {
	fetch: function() {
		return fetch('/api/feeds').then(function(res) {
			return res.json()
		}).then(function(data) {
			AppDispatcher.dispatch({
				actionType: 'FEEDS_INIT',
				feeds: data
			});
			return data;
		});
	},

	selectFeed: function(feed) {
		AppDispatcher.dispatch({
			actionType: 'CONTENT_LOADING',
			spinnerType: 'CONTENT_LOADING'
		});
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
		return fetch('/api/feed', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: feed.name,
				feedUrl: feed.feedUrl
			})
		}).then(function (res) {
			if (res.status == 200) {
				actions.fetch().then(actions.selectFeed.bind(actions, feed))
			} else {
				AppDispatcher.dispatch({
					actionType: 'SHOW_MODAL',
					content: 'Fail to subscribe to feed',
					modalType: 'ERROR'
				});
			}
		})

	},

	deleteFeed: function(feed) {
		var actions = this;
		return fetch('/api/feed/' + feed._id, {
			method: 'delete'
		}).then(function(res) {
			if (res.status !== 200) {
				actions.fetch();
				AppDispatcher.dispatch({
					actionType: 'SHOW_MODAL',
					content: 'Fail to delete feed',
					modalType: 'ERROR'
				});
			}
		});
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
