var React = require('react');
var ReactDOM = require('react-dom');

var FeedActions = require('../actions/feed-actions');
var FeedModal = require('./modals/feed-modal');
var ErrorModal = require('./modals/error-modal');
var Spinner = require('./spinners/spinner');
var Toast = require('./toasts/toast');

var ViewStore = require('../stores/view-store');
var _ = require('underscore');
var $ = require('jquery');

var ViewManager = React.createClass({

	getInitialState: function() {
		return ViewStore.getState();
	},

	componentDidMount: function() {
		this.myStateCache = _.extend({}, ViewStore.getState());
		Object.observe(this.myStateCache, function(changes) {
			console.log('changed !!!  ', changes);
		});
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

	showToast: function() {
		var container = $("<div id='toast-container'></div>");
		$('body').append(container);
		var toast = ReactDOM.render(
			<Toast toast = {this.state.toast}/>,
			container[0]
		);

		console.log(toast.refs.toastContent);
	},

	removeToast: function() {
		var container = this.refs.manager.getElementsByTagName('section')[0];
		ReactDOM.unmountComponentAtNode(container);
	},

	_onChange: function() {
		var viewState = ViewStore.getState();
		this.setState(viewState);
		if (!this.myStateCache.modal.modalShown && viewState.modal.modalShown) {
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

		if (!this.myStateCache.toast.toastShown && viewState.toast.toastShown) {
			this.showToast();
		}

		this.myStateCache = _.extend({}, viewState);
		//this.stateCache = viewState;

	},

	render: function() {
		return null;
	}
});

module.exports = ViewManager;

