var React = require('react');
var FeedItem = require('./feedItem');

var FeedList = React.createClass({

	render: function() {

		var feeds = [];

		for (var key in this.props.todos) {
			//todos.push(this.props.todos[key]);
			feeds.push(<FeedItem feed = {this.props.feeds[key]}/>)
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

