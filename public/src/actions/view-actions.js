var AppDispatcher = require('../dispatcher/AppDispatcher');

var ViewActions = {
	closeModal: function() {
		AppDispatcher.dispatch({
			actionType: 'CLOSE_MODAL'
		});
	}
};

module.exports = ViewActions;
