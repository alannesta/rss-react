var q = require('Q');

var FeedUtil = {
	loadFeed : function (url) {
		if (!this.apiLoaded) {
			alert('api not loaded, please try again later');
			return;
		}
		var deferred = q.defer();
		var feed = new google.feeds.Feed(url);
		feed.setNumEntries(10);

		feed.load(function (result) {
			if (!result.error) {
				//console.log(result.feed);
				deferred.resolve(result.feed.entries);
			}
		});
		return deferred.promise;
	},

	getFeedInfo: function(url) {
		if (!this.apiLoaded) {
			alert('api not loaded, please try again later');
			return;
		}
		var deferred = q.defer();
		var feed = new google.feeds.Feed(url);

		feed.load(function (result) {
			if (!result.error) {
				deferred.resolve(result.feed.title);
			}else{
				deferred.reject(result.error);
			}
		});
		return deferred.promise;
	},

	_onApiLoad: function() {
		this.apiLoaded = true;
	}
};

google.load("feeds", "1");
google.setOnLoadCallback(FeedUtil._onApiLoad.bind(FeedUtil));

module.exports = FeedUtil;
