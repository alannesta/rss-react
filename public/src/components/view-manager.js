var React = require('react');
var ReactDOM = require('react-dom');

var FeedActions = require('../actions/feed-actions');
var ViewActions = require('../actions/view-actions');
var FeedModal = require('./modals/feed-modal');
var ErrorModal = require('./modals/error-modal');
var Spinner = require('./spinners/spinner');
var Toast = require('./toasts/toast');
var ToastList = require('./toasts/toast-list');

var ModalStore = require('../stores/modal-store');
var ToastStore = require('../stores/toast-store');
var cacheFactory = require('../utils/state-cache');

var $ = require('jquery');

var ViewManager = React.createClass({

	getInitialState: function() {
		return Object.assign({}, {modal: ModalStore.getState()}, {toast: ToastStore.getState()});
	},

	componentDidMount: function() {
		cacheFactory.setCache(ToastStore.getState());
		this.cachedToastState = cacheFactory.getCache();
		ModalStore.addChangeListener(this._onModalChange);
		ToastStore.addChangeListener(this._onToastChange);
	},

	componentWillUnmount: function() {
		ModalStore.removeChangeListener(this._onModalChange);
		ToastStore.removeChangeListener(this._onToastChange);
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
			<ToastList onAnimationEnd = {ViewActions.hideToast}/>,
			container[0]
		);

		//toast.refs.toastContent.addEventListener('animationend', function(e) {
		//	console.log('animation end, time used: ' + e.elapsedTime);
		//	ViewActions.hideToast();
		//})
	},

	removeToast: function() {
		var container = document.getElementById('toast-container');
		if (container !== null) {
			ReactDOM.unmountComponentAtNode(container);
			$('body')[0].removeChild(container);
		}
	},

	_onModalChange: function() {
		var ModalState = ModalStore.getState();
		if (ModalState.modalShown) {
			this.appendModal();
			var modalType = ModalState.modalType;
			switch (modalType) {
				case 'ADD_FEED':
					ReactDOM.render(
						<FeedModal content = {ModalState.modalContent} onConfirm = {FeedActions.subscribeFeed.bind(FeedActions)} />,
						document.getElementById('modal-container')
					);
					break;
				case 'ERROR':
					ReactDOM.render(
						<ErrorModal content = {ModalState.modalContent} />,
						document.getElementById('modal-container')
					);
					break;
			}
		}else {
			this.removeModal();
		}
	},

	_onToastChange: function() {
		var ToastState = ToastStore.getState();
		if (this.cachedToastState.toasts.length === 0 && ToastState.toasts.length > 0) {
			this.showToast();
		}else if (ToastState.toasts.length === 0){
			this.removeToast();
		}
		cacheFactory.setCache(ToastStore.getState());
		this.cachedToastState = cacheFactory.getCache();
	},

	render: function() {
		return null;
	}
});

module.exports = ViewManager;

