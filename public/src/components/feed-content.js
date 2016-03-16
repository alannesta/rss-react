var React = require('react');

var FeedContent = React.createClass({
	render: function() {

		var content = [];

		this.props.content.forEach(function(item) {
			content.push(<section key={item.title}><h2><a href={item.link} target="_blank">{item.title}</a></h2><div>{item.contentSnippet}</div></section>);
		});

		return (
			<section className = "feed-content">
				<div id = "content-spinner"></div>
				{content}
			</section>
		)
	}
});

module.exports = FeedContent;
