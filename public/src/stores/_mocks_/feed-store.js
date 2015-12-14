var mockStore = jest.genMockFromModule('../feed-store');
mockStore.getState = jest.genMockFunction().mockImplementation(function() {
	return {
		currentFeed: {},
		allFeeds: [],
		feedContent: []
	};
});

module.exports = mockStore;
