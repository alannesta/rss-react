var React = require('react');
var FeedItem = require('./feedItem');

var FeedList = React.createClass({

	render: function() {

		var feeds = [];

		for (var key in this.props.feeds) {
			feeds.push(<FeedItem feed = {this.props.feeds[key]} key = {this.props.feeds[key]._id}/>)
		}

		return (
			<section>
				<ul>
					{feeds}
				</ul>
			</section>
		)
	}
});

module.exports = FeedList;

