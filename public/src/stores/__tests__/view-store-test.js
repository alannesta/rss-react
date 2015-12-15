jest.autoMockOff();
jest.mock('../../utils/feed-util');
//jest.dontMock('../../actions/feed-actions');

//var FeedActions = require('../../actions/feed-actions');
var Dispatcher = require('../../dispatcher/AppDispatcher');
var ViewStore = require('../view-store');

describe('view store', ()=> {

	it('should be able to show a toast', ()=> {

		Dispatcher.dispatch({
			actionType: 'SHOW_TOAST',
			content: 'Feed Deleted Successfully'
		});

		var state = ViewStore.getState();
		expect(state.toast.toastShown).toEqual(true);
		expect(state.toast.toastContent).toEqual('Feed Deleted Successfully');
	});

});
