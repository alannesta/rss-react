var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _feedsState = {
	currentFeed: {},
	allFeeds: [],
	//feedContent: []
	blogs: []
};

var feed_mixin = _.extend({}, EventEmitter.prototype);

var FeedStore = _.extend(feed_mixin, {
	getState: function() {
		return _feedsState;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});


AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case 'SELECT_FEED':
			_feedsState.currentFeed = action.feed;
			_feedsState.blogs = action.blogs;
			FeedStore.emitChange();
			break;

		case 'FEEDS_INIT':
			_feedsState.allFeeds = action.feeds;
			FeedStore.emitChange();
			break;

		case 'TOGGLE_FEED_ACTIONS':
			var idx = getFeedId();
			//_feedsState.allFeeds.forEach(function(item, index) {
			//	if (item._id === action.feed._id) {
			//		idx = index;
			//	}
			//});
			_feedsState.allFeeds[idx].showActions = action.showActions;
			FeedStore.emitChange();
			break;
		case 'CONTENT_LOADING':
			_feedsState.allFeeds.forEach(function(item, index) {
				if (item._id === action.feed._id) {
					_feedsState.allFeeds[index].isLoading = true;
				} else {
					_feedsState.allFeeds[index].isLoading = false;
				}
			});
			FeedStore.emitChange();
			break;
		case 'CONTENT_LOADED':
			var idx = getFeedId();
			_feedsState.allFeeds[idx].isLoading = false;
			FeedStore.emitChange();
			break;

		default:
		// no op
	}

	function getFeedId() {
		_feedsState.allFeeds.forEach(function(item, index) {
			if (item._id === action.feed._id) {
				idx = index;
			}
		});
		return idx;
	}
});

module.exports = FeedStore;
