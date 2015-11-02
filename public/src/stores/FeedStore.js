var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var request = require('superagent');
var _ = require('underscore');


var CHANGE_EVENT = 'change';


var _feedsState = {
	currentFeed: '',
	allFeeds: [],
	feedContent: []
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

	removeChangeListener: function() {
		this.removeListener(CHANGE_EVENT, callback);
	}
});


AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case 'SELECT_FEED':
			_feedsState.currentFeed = action.feed;
			FeedStore.emitChange();
			break;

		case 'FEEDS_INIT':
			console.log('feeds init');
			_feedsState.allFeeds = action.feeds;
			FeedStore.emitChange();
			break;

		case 'CONTENT_LOADED':
			_feedsState.feedContent = action.content;
			FeedStore.emitChange();

		default:
		// no op
	}
});

module.exports = FeedStore;
