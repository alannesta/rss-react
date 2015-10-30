var AppDispatcher = require('../dispatcher/AppDispatcher');

var FeedActions = {

	load: function(text) {
		AppDispatcher.dispatch({
			actionType: 'CREATE_TODO',
			text: text
		});
	}
};

module.exports = FeedActions;
