google = jest.genMockFunction();
google.load = jest.genMockFunction();
google.setOnLoadCallback = jest.genMockFn();
google.feeds = jest.genMockFunction().mockImplementation(function() {
	return {Feed: 'kaka'};
});

jest.dontMock('../feed-item');
jest.dontMock('classnames');
//jest.dontMock('../../actions/feed-actions');
//jest.dontMock('../../feedUtil');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
//import React from 'react';
//import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';

var FeedItem = require('../feed-item');



describe('Feed Item Test', function() {

	it('should render', function() {
		// Render a checkbox with label in the document
		var feedItem = TestUtils.renderIntoDocument(
			<FeedItem selected = {{_id: 1, name: 'kaka'}} feed = {{_id: 1, name: 'kaka'}} />
		);

		var feedItemNode = ReactDOM.findDOMNode(feedItem);
		console.log(feedItemNode.outerHTML);

		expect(feedItemNode.className).toContain('selected');

		var feedItem2 = TestUtils.renderIntoDocument(
			<FeedItem selected = {{_id: 2, name: 'lala'}} feed = {{_id: 1, name: 'kaka'}} />
		);

		var feedItemNode2 = ReactDOM.findDOMNode(feedItem2);
		expect(feedItemNode2.className).not.toContain('selected');
	});

});
