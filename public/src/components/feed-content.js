var React = require('react');

var FeedContent = React.createClass({
	render: function() {

		var content = [];

		this.props.content.forEach(function(item) {
			content.push(<section><h2>{item.title}</h2><div>{item.contentSnippet}</div></section>);
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
