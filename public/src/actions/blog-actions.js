var AppDispatcher = require('../dispatcher/AppDispatcher');
var Blog = require('../models/blog');
var Feed = require('../models/feed');
var FeedUtil = require('../utils/feed-util');

var DEFAULT_BLOG_COUNT = 10;

var BlogActions = {

	//loadBlogContent: function(feedId, count) {
	//
	//	return this._loadBlogContent(feedId, count).then(function(blogContent) {
	//		AppDispatcher.dispatch({
	//			actionType: 'LOAD_BLOGS',
	//			blogContent: {
	//				blogs: blogContent.blogs,
	//				feedId: blogContent.feedId,
	//				blogCount: blogContent.blogCount
	//			}
	//		})
	//	});
	//},

	loadBlogContent: function(feed) {
		if (this._needReloadFeed(feed)){
			return FeedUtil.loadFeed(feed.feedUrl).then(function(content) {
				blogs = content.map(function(blog) {
					return new Blog(blog);
				});

				var fetchResult = {
					blogs: blogs,
					feedId: feed.id,
					blogCount: 20		// hacky, return a fake total amount without reading from the database
				};

				//refresh app states
				AppDispatcher.dispatch({
					actionType: 'LOAD_BLOGS',
					blogContent: {
						blogs: fetchResult.blogs,
						feedId: fetchResult.feedId,
						blogCount: fetchResult.blogCount
					}
				});
				// save blog content and update feed timestamp
				BlogActions.saveBlogContent(feed.id, blogs).then(function(updatedFeed) {
					AppDispatcher.dispatch({
						actionType: "UPDATE_FEED",
						feed: new Feed(updatedFeed[0])
					});
				});

				return true;
			});
		} else {
			return this._loadBlogContent(feed).then(function(blogContent) {
				AppDispatcher.dispatch({
					actionType: 'LOAD_BLOGS',
					blogContent: {
						blogs: blogContent.blogs,
						feedId: blogContent.feedId,
						blogCount: blogContent.blogCount
					}
				});
				return true;
			});
		}

	},

	// timestamp checking ---> feed api vs local access
	_needReloadFeed: function(feed) {
		if (feed.lastUpdate) {
			// unix timestamp compare, refresh if time span is greater than 12 hours
			var now = Date.now();
			var lastUpdate = Date.parse(feed.lastUpdate);
			//if ((now - lastUpdate) < 7200000) {
			if ((now - lastUpdate) < 72000) {
				console.log('last updated ' + (now - lastUpdate)/3600000 + 'hours ago, load blogs from database');
				return false;
			}
		}
		console.log('reload blogs using google api');
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

		//try {
		//	var cacheObj = {
		//		blogs: strippedBlogs,
		//		count:
		//	}
		//	var localContent = JSON.stringify(strippedBlogs);
		//	window.localStorage.setItem('feed-content::' + feedId, localContent);
		//} catch (err) {
		//	console.error('Local Storage Exception: ', err);
		//}

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


	// localStorage vs DB access
	_loadBlogContent: function(feed) {
		var blogCache;
		if ((blogCache = window.localStorage.getItem('feed-content::'+feed.id)) !== null) {
			// read from local storage
			var blogContent = JSON.parse(blogCache);
			blogContent.blogs.forEach(function(blog) {
				blog = new Blog(blog);
			});
			return Promise.resolve({
				blogs: blogContent.blogs,
				feedId: blogContent.feedId,
				blogCount: blogContent.blogCount
			});
		} else {
			return fetch('/api/feed/' + feed.id + '/blogs?count=' + DEFAULT_BLOG_COUNT).then(function(res) {
				if (res.status == 200) {

					return res.json();
				} else {
					return res.json().then(Promise.reject.bind(Promise));
				}
			}).then(function(blogContent) {
				blogContent.blogs.forEach(function(blog) {
					blog = new Blog(blog);
				});
				return blogContent;
			});
		}
	}

	//_loadBlogContent: function(feedId, count) {
	//	return fetch('/api/feed/' + feedId + '/blogs?count=' + count).then(function(res) {
	//		if (res.status == 200) {
	//
	//			return res.json();
	//		} else {
	//			return res.json().then(Promise.reject.bind(Promise));
	//		}
	//	}).then(function(blogContent) {
	//		blogContent.blogs.forEach(function(blog) {
	//			blog = new Blog(blog);
	//		});
	//		return blogContent;
	//	});
	//}

};

module.exports = BlogActions;
