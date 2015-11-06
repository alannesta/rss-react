var React = require('react');

var FeedContent = React.createClass({
	render: function() {

		var content = [];

		this.props.content.forEach(function(item) {
			content.push(<section><div>{item.title}</div><div>{item.contentSnippet}</div></section>);
		});

		return (
			<section className = 'feed-content'>
				{content}
			</section>
		)
	}
});

module.exports = FeedContent;