var AppDispatcher = require('../dispatcher/AppDispatcher');
var Blog = require('../models/blog');
var Feed = require('../models/feed');
var FeedUtil = require('../utils/feed-util');

var DEFAULT_BLOG_COUNT = 10;

var BlogActions = {

	loadBlogContent: function(feed) {
		if (this._needReloadFeed(feed)){
			return FeedUtil.loadFeed(feed.feedUrl).then(function(content) {
				var blogs = content.map(function(blog) {
					return new Blog(blog);
				});

				return BlogActions.saveBlogContent(feed.id, blogs).then(function(saveResult) {
					var fetchResult = {
						blogs: blogs,
						feedId: feed.id,
						blogCount: saveResult.blogCount
					};

					AppDispatcher.dispatch({
						actionType: 'LOAD_BLOGS',
						blogContent: {
							blogs: fetchResult.blogs,
							feedId: fetchResult.feedId,
							blogCount: fetchResult.blogCount
						}
					});
					console.log('load blogs from api, caching in local storage');
					BlogActions._cacheBlogContent(fetchResult);

					return Promise.resolve({updateFeed: true});
				});
			});
		} else {
			return this.loadBlogContentFromStorage(feed.id);
		}

	},

	// timestamp checking ---> feed api vs local access
	_needReloadFeed: function(feed) {
		if (feed.lastUpdate) {
			// unix timestamp compare, refresh if time span is greater than 12 hours
			var now = Date.now();
			var lastUpdate = Date.parse(feed.lastUpdate);
			if ((now - lastUpdate) < 7200000) {
			//if ((now - lastUpdate) < 72000) {
				console.log('last updated ' + (now - lastUpdate)/3600000 + 'hours ago, load blogs from local/DB');
				return false;
			}
		}
		return true;
	},

	/**
	 * Persist blogs for a specific feed to the database
	 * @param blogs
	 */
	saveBlogContent: function(feedId, blogs) {
		var strippedBlogs = blogs.map(function(blog) {
			return blog = {
				feed_id: feedId,
				blog_url: blog.blog_url,
				blog_title: blog.blog_title,
				blog_digest: blog.blog_digest,
				post_date: new Date(Date.parse(blog.post_date))
			};
		});

		return fetch('/api/feed/' + feedId + '/blogs', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(strippedBlogs)
		}).then(function(res) {
			return res.json();
		});
	},

	/**
	 * save to local storage
	 * @param blogContent {object} for example, {feedId: 3, blogs: [], blogCount: 15}
	 * @private
	 */
	_cacheBlogContent: function(blogContent) {
		try {
			var lsContent = JSON.stringify(blogContent);
			window.localStorage.setItem('feed-content::' + blogContent.feedId, lsContent);
		} catch (err) {
			console.error('Local Storage Exception: ', err);
		}

	},

	/**
	 *
	 * @param feed
	 * @param loadMore {boolean} optional flags to signify if it is a "load more" action (if so, execute a db query)
	 * @returns {*}
	 * @private
	 */
	loadBlogContentFromStorage: function(feedId, count) {
		var blogCache;

		if (!count && (blogCache = window.localStorage.getItem('feed-content::'+feedId)) !== null) {

			console.log('load feeds from localStorage');
			// read from local storage
			var blogContent = JSON.parse(blogCache);
			blogContent.blogs.forEach(function(blog) {
				blog = new Blog(blog);
			});

			AppDispatcher.dispatch({
				actionType: 'LOAD_BLOGS',
				blogContent: {
					blogs: blogContent.blogs,
					feedId: blogContent.feedId,
					blogCount: blogContent.blogCount
				}
			});

			return Promise.resolve({updateFeed: false});	// signals that it is not updated through google api, no need to update feed timestamp

		} else {
			console.log('load blogs from DB');

			return fetch('/api/feed/' + feedId + '/blogs?count=' + (count || DEFAULT_BLOG_COUNT)).then(function(res) {
				if (res.status == 200) {
					return res.json();
				} else {
					return res.json().then(Promise.reject.bind(Promise));
				}
			}).then(function(blogContent) {
				blogContent.blogs.forEach(function(blog) {
					blog = new Blog(blog);
				});
				AppDispatcher.dispatch({
					actionType: 'LOAD_BLOGS',
					blogContent: {
						blogs: blogContent.blogs,
						feedId: blogContent.feedId,
						blogCount: blogContent.blogCount
					}
				});
				return Promise.resolve({updateFeed: false});
			});
		}
	}

};

module.exports = BlogActions;
