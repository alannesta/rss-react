var React = require('react');
var BlogActions = require('../actions/blog-actions');
var classNames = require('classnames');


var FeedContent = React.createClass({

	loadMore: function() {
		if (this.props.blogContent.blogs.length < this.props.blogContent.blogCount) {
			BlogActions.loadBlogContentFromStorage(this.props.blogContent.feedId, this.props.blogContent.blogs.length + 10);
		}
	},

	render: function() {

		var content = [];
		var loadMoreButton;

		var loadButtonClass = classNames({
			'isLoading': this.props.blogContent.isLoading,
			'feed-content-loadmore': true
		});

		this.props.blogContent.blogs.forEach(function(item, index) {
			content.push(
				<section key={index}>
					<h2>
						<a href={item.blog_url} target="_blank">{item.blog_title}</a>
					</h2>
					<div>{item.blog_digest}</div>
				</section>
			);
		});

		if (this.props.blogContent.blogs.length < this.props.blogContent.blogCount) {
			loadMoreButton = <section><button className={loadButtonClass} onClick={this.loadMore}>Load More</button></section>;
			//loadMoreButton = <button className="feed-content-loadmore" onClick={this.loadMore}>Load More</button>
		}

		return (
			<section className = "feed-content">
				<section className="feed-content-list">{content}</section>
				{loadMoreButton}
			</section>
		)
	}
});

module.exports = FeedContent;
