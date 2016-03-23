var connection = require('./mysql-connector');
var mysql = require('mysql');

var feedService = {
	getAllBlogs: function(callback) {
		connection.query('SELECT * from blogs', callback)
	},

	saveBlogs: function(blogs, callback) {

		var values = generateInsertValues(blogs, ['feed_id', 'blog_url', 'blog_title', 'post_date', 'blog_digest']);

		connection.query("INSERT IGNORE INTO blogs (feed_id, blog_url, blog_title, post_date, blog_digest) VALUES ?", [values], callback);

		//connection.beginTransaction(function(err) {
		//	if (err) {
		//		throw err;
		//	}
		//	for (var i = 0; i < blogs.length; i++) {
		//		connection.query('INSERT INTO blogs SET ?', {
		//			blog_url: blogs[i].blog_url,
		//			blog_title: blogs[i].blog_title,
		//			blog_digest: blogs[i].blog_digest,
		//			post_date: blogs[i].post_date
		//		}, function(err) {
		//			if (err) {
		//				return connection.rollback(function() {
		//					throw err;
		//				});
		//			}
		//			if (i = blogs.length-1) {
		//				connection.commit(function(err) {
		//					if (err) {
		//						connection.rollback(function(err) {
		//							throw err;
		//						})
		//					}
		//					console.log('transaction success');
		//				})
		//			}
		//		});
		//	}
		//});

 		//blogs.forEach(function(blog) {
		//	connection.query('INSERT INTO blogs SET ?', {
		//		blog_url: blog.blogUrl,
		//		blog_title: blog.blogTitle,
		//		blog_digest: blog.blogDigest,
		//		post_date: blog.postDate
		//	});
		//
		//});
	}
};

function generateInsertValues(objects, keys) {
	var items = [];
	objects.forEach(function(object) {
		var entry = [];
		keys.forEach(function(key) {
			entry.push(object[key]);
		});
		items.push(entry);
	});
	return items;
}

module.exports = feedService;
