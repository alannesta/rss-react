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
	},

	spinner: {
		spinnerTypes: [],
		containers: {
			CONTENT_LOADING: 'content-spinner'		// for feed content
		}
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

		case 'CONTENT_LOADING':
			_viewState.spinner.spinnerTypes.push(action.spinnerType);
			ViewStore.emitChange();

			break;

		// content loaded
		case 'SELECT_FEED':
			var idx = _viewState.spinner.spinnerTypes.indexOf('CONTENT_LOADING');
			_viewState.spinner.spinnerTypes.splice(idx, 1);
			console.log(_viewState.spinner.spinnerTypes);
			ViewStore.emitChange();
			break;
	}
});

module.exports = ViewStore;
