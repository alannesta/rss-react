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
				<div className="search-button" onClick = {this.searchFeed}></div>
			</section>
		)
	}
});

module.exports = FeedContent;
