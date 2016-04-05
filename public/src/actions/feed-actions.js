var AppDispatcher = require('../dispatcher/AppDispatcher');
var FeedUtil = require('../utils/feed-util');
var ViewActions = require('./view-actions');
var BlogActions = require('./blog-actions');
var Feed = require('../models/feed');
var Blog = require('../models/blog');

var FeedActions = {
	fetch: function() {
		return fetch('/api/feeds').then(function(res) {
			return res.json()
		}).then(function(data) {

			var feeds = data.map(function(feed) {
				return new Feed(feed);
			});

			AppDispatcher.dispatch({
				actionType: 'FEEDS_INIT',
				feeds: feeds
			});
			return feeds;
		}, function() {
			return [];
		});
	},

	/**
	 * the feed here is a {Feed} Object with "id" attribute
	 * @param feed
	 */
	selectFeed: function(feed) {

		var actions = this;

		AppDispatcher.dispatch({
			actionType: 'CONTENT_LOADING',
			spinnerType: 'FEED_ITEM',
			feed: feed
		});

		BlogActions.loadBlogContent(feed).then(function(response) {
			if (response.updateFeed) {
				var feedToUpdate = Object.assign({}, feed, {
					lastUpdate: new Date()
				});
				actions.updateFeed(feedToUpdate).then(function(updatedFeed) {
					var updatedFeed = new Feed(updatedFeed);
					console.log('updatedFeed', updatedFeed);

					actions._feedSelected(updatedFeed);
					AppDispatcher.dispatch({
						actionType: 'UPDATE_FEED',
						feed: updatedFeed
					})
				})
			}else {
				actions._feedSelected(feed);
			}
		});
	},

	/**
	 * Update feed content
	 */
	updateFeed: function(feed) {
		return fetch('/api/feed/' + feed.id, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(feed)
		}).then(function(res) {
			if (res.status == 200) {
				return res.json();
			} else {
				return res.json().then(Promise.reject.bind(Promise));
			}
		});
	},

	_feedSelected: function(feed) {
		console.log('dispatching "feed selected" event');
		AppDispatcher.dispatch({
			actionType: 'SELECT_FEED',
			feed: feed
		});
		AppDispatcher.dispatch({
			actionType: 'CONTENT_LOADED',
			spinnerType: 'FEED_ITEM',
			feed: feed
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

	/**
	 * Here the feed passed in is without "id" (parsed by google feed api, not persisted yet)
	 * @param feed
	 * @returns {*|Promise.<T>}
	 */
	subscribeFeed: function(feed) {
		var actions = this;
		return fetch('/api/feed', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				feedName: feed.name,	// name is used in the results from google api
				feedUrl: feed.feedUrl
			})
		}).then(function (res) {
			if (res.status == 200) {
				return res.json();
			}else {
				return res.json().then(Promise.reject.bind(Promise));
			}
		}).then(function(feed) {
			var subscribedFeed = new Feed(feed);
			actions.fetch().then(actions.selectFeed.bind(actions, subscribedFeed));
			ViewActions.showToast('Feed subscribed successfully');
		}, function() {
			AppDispatcher.dispatch({
				actionType: 'SHOW_MODAL',
				content: 'Fail to subscribe to feed',
				modalType: 'ERROR'
			});
		});

	},

	deleteFeed: function(feed, reselect) {
		var actions = this;
		return fetch('/api/feed/' + feed._id, {
			method: 'delete'
		}).then(function(res) {
			if (res.status !== 200) {
				AppDispatcher.dispatch({
					actionType: 'SHOW_MODAL',
					content: 'Fail to delete feed',
					modalType: 'ERROR'
				});
			}
			ViewActions.showToast('Feed Deleted Successfully');
			actions.fetch().then(function(data) {
				if (reselect) {
					actions.selectFeed(data[0]);
				}
			});

		});
	},

	showFeedActions: function(feed) {
		AppDispatcher.dispatch({
			actionType: 'TOGGLE_FEED_ACTIONS',
			feed: feed,
			showActions: true
		})
	},

	hideFeedActions: function(feed) {
		AppDispatcher.dispatch({
			actionType: 'TOGGLE_FEED_ACTIONS',
			feed: feed,
			showActions: false
		})
	}
};

module.exports = FeedActions;
