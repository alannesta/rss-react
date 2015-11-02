var React = require('react');

var FeedContent = React.createClass({

	searchFeed: function() {

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
