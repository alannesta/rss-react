google = jest.genMockFunction();
google.load = jest.genMockFunction();
google.setOnLoadCallback = jest.genMockFn();
google.feeds = jest.genMockFunction().mockImplementation(function() {
	return {Feed: 'kaka'};
});

jest.autoMockOff();
//jest.dontMock('../feed-store');
//jest.dontMock('../../actions/feed-actions');

//var FeedActions = require('../../actions/feed-actions');
var Dispatcher = require('../../dispatcher/AppDispatcher');
var FeedStore = require('../feed-store');

describe('feed store', ()=> {

	it('handle the select feed event', ()=> {

		Dispatcher.dispatch({
			actionType: 'SELECT_FEED',
			feed: {name: 'kaka', _id: 1},
			content: ['random feed content', 'random content 2']
		});

		var state = FeedStore.getState();
		expect(state.feedContent).toEqual(['random feed content', 'random content 2']);
	});

});
