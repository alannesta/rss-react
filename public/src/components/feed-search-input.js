var React = require('react');
var FeedActions = require('../actions/feed-actions');

var FeedContent = React.createClass({

	searchFeed: function() {
		FeedActions.searchFeed(this.refs.inputField.value);
	},

	render: function() {
		return (
			<section className = "toolbar">
				<input ref = "inputField" type = "text" />
				<button onClick = {this.searchFeed}>Submit</button>
			</section>
		)
	}
});

module.exports = FeedContent;
