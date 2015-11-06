var React = require('react');
var ReactDOM = require('react-dom');
var FeedActions = require('../actions/feed-actions');
var FeedModal = require('./feed-modal');

var ViewStore = require('../stores/view-store');
var $ = require('jquery');

var ViewManager = React.createClass({

	regions: {
		modalRegion: document.getElementById('modal-container')
	},

	componentDidMount: function() {
		ViewStore.addChangeListener(this._onChange);

	},

	componentWillUnmount: function() {
		ViewStore.removeChangeListener(this._onChange);
	},

	componentWillReceiveProps: function() {
	},

	componentWillUpdate: function() {

	},

	componentDidUpdate: function() {
	},

	_onChange: function() {
		var manager = this;
		var viewState = ViewStore.getState();

		// TODO: modal type should also be in view state
		if (viewState.modalShown) {
			$('body').addClass('modal-shown');
			ReactDOM.render(
				<FeedModal onConfirm = {FeedActions.subscribeFeed} />,
				manager.regions.modalRegion
			)
		}else {
			$('body').removeClass('modal-shown');
			ReactDOM.unmountComponentAtNode(manager.regions.modalRegion);
		}
		this.setState(viewState);
	},

	render: function() {
		return null;	// not rendering any DOM elements
	}
});

module.exports = ViewManager;

