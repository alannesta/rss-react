jest.dontMock('../toast');
jest.dontMock('classnames');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Toast = require('../toast');

describe('Toast Test', function() {
	it('should render the toast correctly', function() {
		var toastState = {
			toastShown: true,
			toastContent: 'Test Content'
 		};

		var toastInstance = TestUtils.renderIntoDocument(
			<Toast toast = {toastState} />
		);
		var toastNode = ReactDOM.findDOMNode(toastInstance);
		console.log(toastNode.outerHTML);

		expect(toastNode.getElementsByClassName('shown').length).toEqual(1);
		expect(toastNode.getElementsByClassName('shown')[0].textContent).toEqual('Test Content');
	});
});
