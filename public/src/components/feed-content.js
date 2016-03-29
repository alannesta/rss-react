var React = require('react');
var FeedActions = require('../actions/feed-actions');

var FeedContent = React.createClass({

	loadMore: function() {
		if (this.props.blogContent.blogs.length < this.props.blogContent.blogCount) {
			FeedActions.loadBlogContent(this.props.blogContent.feedId, this.props.blogContent.blogs.length + 10);
		}
	},

	render: function() {

		var content = [];
		var loadMoreButton;

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
			loadMoreButton = <section className="feed-content-loadmore"><button onClick={this.loadMore}>Load More</button></section>;
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
