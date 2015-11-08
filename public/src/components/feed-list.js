var React = require('react');
var FeedItem = require('./feed-item');

var FeedList = React.createClass({

	render: function() {

		var feeds = [];

		for (var key in this.props.feeds) {
			feeds.push(<FeedItem selected = {this.props.selected} feed = {this.props.feeds[key]} key = {this.props.feeds[key]._id}/>)
		}

		return (
			<section className = 'feed-nav'>
				<ul>
					{feeds}
				</ul>
			</section>
		)
	}
});

module.exports = FeedList;

