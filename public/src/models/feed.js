function Feed(options) {
	if (typeof options.id !== 'undefined') {
		this.id = options.id;
		if (typeof options._id === 'undefined') {
			this._id = this.id;
		}
	} else if (typeof options._id !== 'undefined') {
		this._id = options._id;
		this.id = this._id;
	} else {
		throw new Error('Either an id or _id must be specified');
	}

	if (typeof options.name !== 'undefined') {
		this.name = options.name;
		if (typeof options.feedName === 'undefined') {
			this.feedName = this.name;
		}
	} else if (typeof options.feedName !== 'undefined') {
		this.feedName = options.feedName;
		this.name = this.feedName;
	} else if (typeof options.feed_name !== 'undefined') {
		this.feedName = options.feed_name;
		this.name = this.feedName;
	}

	this.feedUrl = options.feedUrl || options.feed_url;
	this.isLoading = options.isLoading;
}

module.exports = Feed;
