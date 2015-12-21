var AppDispatcher = require('../dispatcher/AppDispatcher');

var ViewActions = {
	closeModal: function() {
		AppDispatcher.dispatch({
			actionType: 'CLOSE_MODAL'
		});
	},

	showToast: function(content) {
		AppDispatcher.dispatch({
			actionType: 'SHOW_TOAST',
			content: content
		})
	},

	hideToast: function(uid) {
		AppDispatcher.dispatch({
			actionType: 'HIDE_TOAST',
			uid: uid
		})
	}
};

module.exports = ViewActions;
