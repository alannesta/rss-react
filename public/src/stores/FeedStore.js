var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';


var _feedsState = {
	currentFeed: '',
	allFeeds: []
};

var feed_mixin = _.extend({}, EventEmitter.prototype);

var FeedStore = _.extend(feed_mixin, {
	getAll: function() {
		return _feedsState.allFeeds;
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
			FeedStore.currentFeed = action.feed;
			FeedStore.emitChange();
			break;

		default:
		// no op
	}
});

module.exports = TodoStore;
