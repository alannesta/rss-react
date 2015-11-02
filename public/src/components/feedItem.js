var React = require('react');
var FeedActions = require('../actions/feedActions');
var classNames = require('classnames');

var FeedItem = React.createClass({

	onClickHandler: function() {
		FeedActions.selectFeed(this.props.feed);
	},

	render: function() {
		var selectedClass = classNames({
			'selected': this.props.selected._id === this.props.feed._id,
			'feed-nav-item': true
		});
		return (
			<li className={selectedClass} onClick={this.onClickHandler}>{this.props.feed.name}</li>
			//<li onClick={FeedActions.selectFeed.bind(this, this.props.feed)}>{this.props.feed.name}</li>	// more straight forward
		)
	}
});

module.exports = FeedItem;
