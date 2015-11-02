var React = require('react');

var FeedModal = React.createClass({

	render: function() {
		return (
			<section>
				Are you sure you want to subscribe to {this.props.feed.name}
			</section>
		)
	}
});

module.exports = FeedModal;
