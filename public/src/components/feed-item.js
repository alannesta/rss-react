var React = require('react');
var FeedActions = require('../actions/feed-actions');
var classNames = require('classnames');

var FeedItem = React.createClass({

	selectFeed: function () {
		FeedActions.selectFeed(this.props.feed);
	},

	deleteFeed: function () {
		console.log('delete feed');
		FeedActions.deleteFeed(this.props.feed);
	},

	showActions: function () {
		//console.log('mouseenter');
		FeedActions.toggleFeedActions(this.props.feed);
	},

	hideActions: function () {
		//console.log('mouseLeft');
		FeedActions.toggleFeedActions(this.props.feed);
	},



	render: function () {
		var selectedClass = classNames({
			'selected': this.props.selected._id === this.props.feed._id,
			'feed-nav-item': true
		});

		var feedAction = classNames({
			'show-actions': this.props.feed.showActions
		});

		return (
			<li className={selectedClass} onMouseEnter={this.showActions}
				onMouseLeave={this.hideActions}>
				<section id="content"  onClick={this.selectFeed}>{this.props.feed.name}</section>
				<section id="actions" className={feedAction}>
					<button onClick={this.deleteFeed}>Delete</button>
				</section>
			</li>
			//<li onClick={FeedActions.selectFeed.bind(this, this.props.feed)}>{this.props.feed.name}</li>	// more straight forward
		)
	}
});

module.exports = FeedItem;
