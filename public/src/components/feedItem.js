var React = require('react');

var FeedItem = React.createClass({
	render: function() {
		return (
			<li>{this.props.feed.name}</li>
		)
	}
});

module.exports = FeedItem;
