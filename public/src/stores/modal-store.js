var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var FeedActions = require('../actions/feed-actions');
var _ = require('underscore');


var CHANGE_EVENT = 'change';

var TYPE = {
	DEFAULT: 'default'
};

var _modalState = {
	modalContent: {}
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

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});


AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case 'SHOW_MODAL':
			_modalState.modalContent = action.content;
			ModalStore.emitChange();
			break;
	}
});

module.exports = ModalStore;
