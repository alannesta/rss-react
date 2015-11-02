var React = require('react');
var FeedActions = require('../actions/feedActions');

var FeedItem = React.createClass({

	onClickHandler: function() {
		FeedActions.selectFeed(this.props.feed);
		FeedActions.fetchContent(this.props.feed.feedUrl);
	},

	render: function() {
		return (
			<li onClick={this.onClickHandler}>{this.props.feed.name}</li>
			//<li onClick={FeedActions.selectFeed.bind(this, this.props.feed)}>{this.props.feed.name}</li>	// more straight forward
		)
	}
});

module.exports = FeedItem;
