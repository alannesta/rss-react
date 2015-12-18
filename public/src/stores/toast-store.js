var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _toastState = {
	toastShown: false,
	toastContent: ''
};

var ToastStore = Object.assign({}, EventEmitter.prototype, {
	getState: function() {
		return _toastState;
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
		case 'SHOW_TOAST':
			_toastState.toastShown = true;
			_toastState.toastContent = action.content;
			ToastStore.emitChange();
			break;
		case 'HIDE_TOAST':
			_toastState.toastShown = false;
			ToastStore.emitChange();
			break;
	}
});

module.exports = ToastStore;
