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

		if (actions._needReloadFeed(feed)) {
		//if (true) {
			FeedUtil.loadFeed(feed.feedUrl).then(function(content) {
				blogs = content.map(function(blog) {
					return new Blog(blog);
				});

				var fetchResult = {
					blogs: blogs,
					feedId: feed.id,
					blogCount: 20		// hacky, return a fake total amount without reading from the database
				};

				//refresh app states
				AppDispatcher.dispatch({
					actionType: 'LOAD_BLOGS',
					blogContent: {
						blogs: fetchResult.blogs,
						feedId: fetchResult.feedId,
						blogCount: fetchResult.blogCount
					}
				});
				actions._feedSelected(feed);

				// save blog content and update feed timestamp
				BlogActions.saveBlogContent(feed.id, blogs).then(function(updatedFeed) {
					AppDispatcher.dispatch({
						actionType: "UPDATE_FEED",
						feed: new Feed(updatedFeed[0])
					});
				});
			});
		}else {
			// load the last 10 blogs from database
			BlogActions.loadBlogContent(feed.id, 10).then(function() {
				actions._feedSelected(feed);
			})
		}
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
		}, function(res) {
			console.log(res.status);
		});
	},

	/**
	 * Check last_update time stamp of feed
	 * @param feed
	 */
	_needReloadFeed: function(feed) {
		if (feed.lastUpdate) {
			// unix timestamp compare, refresh if time span is greater than 12 hours
			var now = Date.now();
			var lastUpdate = Date.parse(feed.lastUpdate);
			if ((now - lastUpdate) < 7200000) {
				console.log('last updated ' + (now - lastUpdate)/3600000 + 'hours ago, load blogs from database');
				return false;
			}
		}
		console.log('reload blogs using google api');
		return true;
	},

	_feedSelected: function(feed) {
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
				AppDispatcher.dispatch({
					actionType: 'SHOW_MODAL',
					content: 'Fail to subscribe to feed',
					modalType: 'ERROR'
				});
				return res.json().then(Promise.reject.bind(Promise));
			}
		}).then(function(feed) {
			var subscribedFeed = new Feed(feed);
			actions.fetch().then(actions.selectFeed.bind(actions, subscribedFeed));
			ViewActions.showToast('Feed subscribed successfully');
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
