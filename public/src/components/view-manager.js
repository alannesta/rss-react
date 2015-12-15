var React = require('react');
var ReactDOM = require('react-dom');
var FeedActions = require('../actions/feed-actions');
var FeedModal = require('./modals/feed-modal');
var ErrorModal = require('./modals/error-modal');
var Spinner = require('./spinners/spinner');

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
		if (viewState.modal.modalShown) {
			$('body').addClass('modal-shown');

			var modalType = viewState.modal.modalType;
			switch (modalType) {
				case 'ADD_FEED':
					ReactDOM.render(
						<FeedModal content = {viewState.modal.modalContent} onConfirm = {FeedActions.subscribeFeed.bind(FeedActions)} />,
						document.getElementById('modal-container')
					);
					break;
				case 'ERROR':
					ReactDOM.render(
						<ErrorModal content = {viewState.modal.modalContent} />,
						document.getElementById('modal-container')
					);
					break;
			}
		}else {
			$('body').removeClass('modal-shown');
			ReactDOM.unmountComponentAtNode(document.getElementById('modal-container'));
		}

		if (viewState.spinner.spinnerTypes.length > 0) {
			var spinnerTypes = viewState.spinner.spinnerTypes;
			spinnerTypes.forEach(function(spinnerType) {
				ReactDOM.render(
					<Spinner />,
					document.getElementById(viewState.spinner.containers[spinnerType])
				)
			})

		} else {
			for (var key in viewState.spinner.containers) {
				ReactDOM.unmountComponentAtNode(document.getElementById(viewState.spinner.containers[key]));
			}
		}
	},

	render: function() {
		return null;	// not rendering any DOM elements
	}
});

module.exports = ViewManager;

