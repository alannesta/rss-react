var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _viewState = {
	modalShown: false
};

var ViewStore = _.extend({}, EventEmitter.prototype, {
	getState: function() {
		return _viewState;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function() {
		this.removeListener(CHANGE_EVENT);
	}
});


AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case 'SHOW_MODAL':
			_viewState.modalShown = true;
			ViewStore.emitChange();
			break;

		case 'CLOSE_MODAL':
			_viewState.modalShown = false;
			ViewStore.emitChange();
	}
});

module.exports = ViewStore;
