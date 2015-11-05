var React = require('react');
var ReactDOM = require('react-dom');
var ViewStore = require('../stores/view-store');

var ViewManager = React.createClass({

	componentDidMount: function() {
		console.log('component did mount');
		ViewStore.removeChangeListener(this._onChange);

	},

	componentWillUnmount: function() {
		ViewStore.removeChangeListener(this._onChange);
	},

	componentWillReceiveProps: function() {
		console.log('componentWillReceiveProps');
	},

	componentWillUpdate: function() {
		console.log('component will update');

	},

	componentDidUpdate: function() {
		console.log('componenet did update');
	},

	render: function() {
		return React.DOM.noscript();
	}
});

module.exports = ViewManager;

