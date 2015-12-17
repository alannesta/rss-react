var React = require('react');
var ReactDOM = require('react-dom');

var FeedActions = require('../actions/feed-actions');
var ViewActions = require('../actions/view-actions');
var FeedModal = require('./modals/feed-modal');
var ErrorModal = require('./modals/error-modal');
var Spinner = require('./spinners/spinner');
var Toast = require('./toasts/toast');

var ViewStore = require('../stores/view-store');
var cacheFactory = require('../utils/state-cache');

var _ = require('underscore');
var $ = require('jquery');

var ViewManager = React.createClass({

	getInitialState: function() {
		return ViewStore.getState();
	},

	componentDidMount: function() {
		cacheFactory.setCache(JSON.stringify(ViewStore.getState()));
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
		//var manager = this;
		var container = $("<div id='toast-container'></div>");
		$('body').append(container);
		var toast = ReactDOM.render(
			<Toast toast = {this.state.toast}/>,
			container[0]
		);

		toast.refs.toastContent.addEventListener('animationend', function(e) {
			console.log('animation end, time used: ' + e.elapsedTime);
			ViewActions.hideToast();
		})
	},

	removeToast: function() {
		var container = document.getElementById('toast-container');
		if (container !== null) {
			ReactDOM.unmountComponentAtNode(container);
			$('body')[0].removeChild(container);
		}
	},

	_onChange: function() {
		console.log('store changed', cacheFactory.getCache());
		var viewState = ViewStore.getState();
		this.setState(viewState);
		if (!cacheFactory.getCache().modal.modalShown && viewState.modal.modalShown) {
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
		if (!cacheFactory.getCache().toast.toastShown && viewState.toast.toastShown) {
			this.showToast();
		}else if (cacheFactory.getCache().toast.toastShown && !viewState.toast.toastShown){
			console.log('remove');
			this.removeToast();
		}
		cacheFactory.setCache(JSON.stringify(viewState));
	},

	render: function() {
		return null;
	}
});

module.exports = ViewManager;

