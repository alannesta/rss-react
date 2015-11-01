var React = require('react');
var SampleComponent = require('./components/sample');
var TodoApp = TodoApp = require('./components/TodoApp.react');
var FeedApp = require('./components/rssApp');

React.render(
    <TodoApp />,
    document.getElementById('todoapp')
);

React.render(
    <FeedApp />,
	document.getElementById('feedapp')
);

