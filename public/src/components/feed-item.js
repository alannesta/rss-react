var React = require('react');
var FeedActions = require('../actions/feed-actions');
var classNames = require('classnames');

var FeedItem = React.createClass({

	selectFeed: function () {
		FeedActions.selectFeed(this.props.feed);
	},

	deleteFeed: function () {
		console.log('delete feed');
	},

	showActions: function () {
		//console.log('mouseenter');
		this.showAction = true;
	},

	hideActions: function () {
		//console.log('mouseLeft');
		this.showAction = false;
	},

	render: function () {
		var view = this;
		var selectedClass = classNames({
			'selected': this.props.selected._id === this.props.feed._id,
			'feed-nav-item': true,
			'show-actions': view.showAction
		});
		return (
			<li className={selectedClass} onMouseOver={this.showActions}
				onMouseOut={this.hideActions} onClick={this.selectFeed}>
				{this.props.feed.name}
				<section id="actions">
					<span onClick={this.deleteFeed}>Delete</span>
				</section>
			</li>
			//<li onClick={FeedActions.selectFeed.bind(this, this.props.feed)}>{this.props.feed.name}</li>	// more straight forward
		)
	}
});

module.exports = FeedItem;
