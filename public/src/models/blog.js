function Blog(options) {
	// gap the difference between google feed api and database data
	this.blog_url = options.blog_url || options.link;
	this.blog_title = options.blog_title || options.title;
	this.blog_digest = options.blog_digest || options.contentSnippet;
	this.post_date = options.post_date || options.publishedDate;

}

module.exports = Blog;
