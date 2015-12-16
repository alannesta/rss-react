var React = require('react');
var ReactDOM = require('react-dom');
var FeedActions = require('../actions/feed-actions');
var FeedModal = require('./modals/feed-modal');
var ErrorModal = require('./modals/error-modal');
var Spinner = require('./spinners/spinner');
var Toast = require('./toasts/toast');

var ViewStore = require('../stores/view-store');
var $ = require('jquery');

var ViewManager = React.createClass({

	getInitialState: function() {
		return ViewStore.getState();
	},

	componentDidMount: function() {
		ViewStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ViewStore.removeChangeListener(this._onChange);
	},

	appendModal: function() {
		var backdrop = $("<div class='backdrop'></div>");
		var container = $("<div id='modal-container'></div>");
		$('body').addClass('modal-shown');
		$('body').append(container);
		$('body').append(backdrop);
	},

	removeModal: function() {
		var container = document.getElementById('modal-container');
		var backdrop = document.getElementsByClassName('backdrop')[0];
		if (container !== null && backdrop !== null) {
			ReactDOM.unmountComponentAtNode(container);
			$('body')[0].removeChild(container);
			$('body')[0].removeChild(backdrop);
			$('body').removeClass('modal-shown');
		}
	},

	_onChange: function() {
		var viewState = ViewStore.getState();
		this.setState(viewState);

		// TODO: modal type should also be in view state
		if (viewState.modal.modalShown) {
			this.appendModal();
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
			this.removeModal();
		}
	},

	render: function() {
		return (
			<Toast toast = {this.state.toast} />
		);
		//return null;	// not rendering any DOM elements
	}
});

module.exports = ViewManager;

