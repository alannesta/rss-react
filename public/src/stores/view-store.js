var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _viewState = {
	modal: {
		modalShown: false,
		modalType: '',
		modalContent: {}
	},

	toast: {
		toastShown: false,
		toastContent: ''
	}
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

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});


AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case 'SHOW_MODAL':
			_viewState.modal.modalShown = true;
			_viewState.modal.modalType = action.modalType;
			_viewState.modal.modalContent = action.content;
			ViewStore.emitChange();
			break;

		case 'CLOSE_MODAL':
			_viewState.modal.modalShown = false;
			ViewStore.emitChange();
			break;
	}
});

module.exports = ViewStore;
