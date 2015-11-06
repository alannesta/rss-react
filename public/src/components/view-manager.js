var React = require('react');
var ReactDOM = require('react-dom');
var FeedActions = require('../actions/feed-actions');
var FeedModal = require('./modals/feed-modal');
var ErrorModal = require('./modals/error-modal');

var ViewStore = require('../stores/view-store');
var $ = require('jquery');

var ViewManager = React.createClass({

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
		var viewState = ViewStore.getState();

		// TODO: modal type should also be in view state
		if (viewState.modalShown) {
			$('body').addClass('modal-shown');

			var modalType = viewState.modalType;
			switch (modalType) {
				case 'ADD_FEED':
					ReactDOM.render(
						<FeedModal onConfirm = {FeedActions.subscribeFeed.bind(FeedActions)} />,
						document.getElementById('modal-container')
					);
				case 'ERROR':
					ReactDOM.render(
						<ErrorModal />,
						document.getElementById('modal-container')
					);
			}
		}else {
			$('body').removeClass('modal-shown');
			ReactDOM.unmountComponentAtNode(document.getElementById('modal-container'));
		}
		this.setState(viewState);
	},

	render: function() {
		return null;	// not rendering any DOM elements
	}
});

module.exports = ViewManager;

