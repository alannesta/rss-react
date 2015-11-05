var ReactDOM = require('react-dom');
var React = require('react');

var FeedApp = require('./components/rss-app');


ReactDOM.render(
    <FeedApp />,
	document.getElementById('feedapp')
);
