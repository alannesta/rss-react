var mockAction = jest.genMockFromModule('../feed-actions');
mockAction.fetch = jest.genMockFunction().mockImplementation(function() {
	console.log('using actions mock');
});

module.exports = mockAction;
