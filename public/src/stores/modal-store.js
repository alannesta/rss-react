var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var request = require('superagent');
var FeedActions = require('../actions/FeedActions');
var _ = require('underscore');


var CHANGE_EVENT = 'change';

var TYPE = {
	DEFAULT: 'default'
};

var _modalState = {
	modalType: TYPE.DEFAULT,
	shown: false,
	modalContent: {},
	onConfirm: function() {
		FeedActions.subscribeFeed(this.modalContent);
	}
};


var ModalStore = _.extend({}, EventEmitter.prototype, {
	getState: function() {
		return _modalState;
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
		case 'SHOW_MODAL':
			_modalState.shown = true;
			_modalState.modalContent = action.feed;
			ModalStore.emitChange();
			break;

		case 'CLOSE_MODAL':
			_modalState.shown = false;
			ModalStore.emitChange();
	}
});

module.exports = ModalStore;
