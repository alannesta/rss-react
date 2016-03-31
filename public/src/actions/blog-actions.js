var AppDispatcher = require('../dispatcher/AppDispatcher');
var Blog = require('../models/blog');

var BlogActions = {

	loadBlogContent: function(feedId, count) {
		return this._loadBlogContent(feedId, count).then(function(blogContent) {
			AppDispatcher.dispatch({
				actionType: 'LOAD_BLOGS',
				blogContent: {
					blogs: blogContent.blogs,
					feedId: blogContent.feedId,
					blogCount: blogContent.blogCount
				}
			})
		});
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

	_loadBlogContent: function(feedId, count) {
		return fetch('/api/feed/' + feedId + '/blogs?count=' + count).then(function(res) {
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

};

module.exports = BlogActions;
