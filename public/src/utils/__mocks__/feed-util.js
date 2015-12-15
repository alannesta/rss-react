// mock 'google' window global
google = jest.genMockFunction();
google.load = jest.genMockFunction();
google.setOnLoadCallback = jest.genMockFn();
google.feeds = jest.genMockFunction().mockImplementation(function() {
	return {Feed: 'kaka'};
});

var mockUtil = jest.genMockFromModule('../feed-util');
mockUtil.loadFeed = jest.genMockFunction().mockImplementation(function() {
	return Promise.resolve();
});
mockUtil.getFeedInfo = jest.genMockFunction().mockImplementation(function() {
	return Promise.resolve();
});

module.exports = mockUtil;
