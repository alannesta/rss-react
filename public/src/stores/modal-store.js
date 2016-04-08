var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var _modalState = {
	modalShown: false,
	modalType: '',
	modalContent: {}
};

var ModalStore = assign({}, EventEmitter.prototype, {
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
			_modalState.modalShown = true;
			_modalState.modalType = action.modalType;
			_modalState.modalContent = action.content;
			ModalStore.emitChange();
			break;

		case 'CLOSE_MODAL':
			_modalState.modalShown = false;
			ModalStore.emitChange();
			break;
	}
});

module.exports = ModalStore;
