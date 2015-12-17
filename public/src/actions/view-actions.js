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

	hideToast: function() {
		AppDispatcher.dispatch({
			actionType: 'HIDE_TOAST'
		})
	}
};

module.exports = ViewActions;
