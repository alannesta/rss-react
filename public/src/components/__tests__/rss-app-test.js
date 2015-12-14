google = jest.genMockFunction();
google.load = jest.genMockFunction();
google.setOnLoadCallback = jest.genMockFn();
google.feeds = jest.genMockFunction().mockImplementation(function() {
	return {Feed: 'kaka'};
});

jest.autoMockOff();
jest.dontMock('../rss-app');
jest.mock('../../actions/feed-actions');
//jest.mock('../../stores/feed-store');
var RssApp = require('../rss-app');

var FeedActions = require('../../actions/feed-actions');
//var FeedStore = require('../../stores/feed-store');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe('rss app test', ()=> {

	it('should get correct initial state', ()=> {
		var app = TestUtils.renderIntoDocument(
			<RssApp />
		);
		//expect(FeedStore.getState).toBeCalled();
		expect(FeedActions.fetch).toBeCalled();
	});

});
