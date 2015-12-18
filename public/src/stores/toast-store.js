var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _toastState = {
	toasts: []
};



var ToastStore = Object.assign({}, EventEmitter.prototype, {
	getState: function() {
		return Object.assign({}, _toastState);
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
			_toastState.toasts.push({
				toastContent: action.content
			});
			ToastStore.emitChange();
			break;
		case 'HIDE_TOAST':
			_toastState.toasts = [];
			ToastStore.emitChange();
			break;
	}
});

module.exports = ToastStore;
