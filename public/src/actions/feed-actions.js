var AppDispatcher = require('../dispatcher/AppDispatcher');
var FeedUtil = require('../utils/feed-util');
var ViewActions = require('./view-actions');
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
			//console.log(feeds);
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
			FeedUtil.loadFeed(feed.feedUrl).then(function(content) {
				var blogs = content.map(function(blog) {
					return new Blog(blog);
				});
				actions._feedLoaded(feed, blogs);
				actions.saveBlogContent(feed.id, blogs);
			});
		}else {
			actions.loadBlogContent(feed.id).then(function(content) {
				var blogs = content.map(function(blog) {
					return new Blog(blog);
				});
				actions._feedLoaded(feed, blogs);
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
			if ((now - lastUpdate) < 43200000) {
				console.log('last updated ' + (now - lastUpdate)/3600000 + 'hours ago, load blogs from database');
				return false;
			}
		}
		console.log('reload blogs using google api');
		return true;
	},

	/**
	 * Load blog content from "blog" table for a specific feed
	 * @param feed
	 */
	loadBlogContent: function(feedId) {
		return fetch('/api/feed/'+feedId+'/blogs').then(function(res) {
			if (res.status == 200) {
				return res.json();
			}else {
				return res.json().then(Promise.reject.bind(Promise));
			}
		});
	},

	/**
	 * Persist blogs for a specific feed to the database
	 * @param blogs
	 */
	saveBlogContent: function(feedId, blogs) {
		var strippedBlogs = blogs.map(function(blog) {
			return blog = {
				feed_id: feedId,
				blog_url: blog.blog_url,
				blog_title: blog.blog_title,
				blog_digest: blog.blog_digest,
				post_date: new Date(Date.parse(blog.post_date))
			};
		});
		return fetch('/api/feed/' + feedId + '/blogs', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(strippedBlogs)
		}, function(res) {
			console.log(res.status);
		});
	},

	_feedLoaded: function(feed, blogs) {
		AppDispatcher.dispatch({
			actionType: 'SELECT_FEED',
			feed: feed,
			blogs: blogs
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
