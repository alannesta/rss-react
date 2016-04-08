var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _toastState = {
	toasts: []
};



var ToastStore = assign({}, EventEmitter.prototype, {
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
			_toastState.toasts.push({
				toastContent: action.content,
				uid: Math.round(Math.random()*10000)
			});
			ToastStore.emitChange();
			break;
		case 'HIDE_TOAST':
			var uid = action.uid;
			//_toastState.toasts = [];
			_toastState.toasts = _toastState.toasts.filter(function(toast) {
				return toast.uid !== uid;
			});

			ToastStore.emitChange();
			break;
	}
});

module.exports = ToastStore;
