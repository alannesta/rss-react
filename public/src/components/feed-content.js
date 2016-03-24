var React = require('react');

var FeedContent = React.createClass({
	render: function() {

		var content = [];

		this.props.blogs.forEach(function(item, index) {
			content.push(
				<section key={index}>
					<h2>
						<a href={item.blog_url} target="_blank">{item.blog_title}</a>
					</h2>
					<div>{item.blog_digest}</div>
				</section>
			);
		});

		return (
			<section className = "feed-content">
				<div id = "content-spinner"></div>
				{content}
			</section>
		)
	}
});

module.exports = FeedContent;
