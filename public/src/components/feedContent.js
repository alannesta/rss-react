var React = require('react');

var FeedContent = React.createClass({
	render: function() {
		return (
			<section>
				<h1>{this.props.feed.name}</h1>
			</section>
		)
	}
});

module.exports = FeedContent;
