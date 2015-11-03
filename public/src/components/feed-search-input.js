var React = require('react');
var FeedActions = require('../actions/FeedActions');

var FeedContent = React.createClass({

	searchFeed: function() {
		console.log(this.refs.inputField.value);
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
