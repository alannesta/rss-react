var React = require('react');
var SampleComponent = require('./components/sample');
var FeedApp = require('./components/rssApp');

React.render(
    <FeedApp />,
	document.getElementById('feedapp')
);

