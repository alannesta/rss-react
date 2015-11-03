var ReactDOM = require('react-dom');
var React = require('react');

var FeedApp = require('./components/rssApp');
var Modal = require('./components/feed-modal');


ReactDOM.render(
    <FeedApp />,
	document.getElementById('feedapp')
);

ReactDOM.render(
	<Modal/>,
	document.getElementById('modal-container')
);

