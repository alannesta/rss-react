var ReactDOM = require('react-dom');
var React = require('react');
var FeedApp = require('./components/rss-app');
var ViewManager = require('./components/view-manager');


ReactDOM.render(
	<section>
		<FeedApp />
		<ViewManager />
	</section>,
	document.getElementById('feedapp')
);
