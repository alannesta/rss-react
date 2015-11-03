var React = require('react');
var ModalStore = require('../stores/modal-store');
var classNames = require('classnames');

var FeedModal = React.createClass({

	getInitialState: function() {
		return ModalStore.getState();
	},

	modalState: function() {
		return ModalStore.getState();
	},

	componentDidMount: function() {
		ModalStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ModalStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(this.modalState());

	},

	render: function() {

		var modalClass = classNames({
			'add-feed-modal': true
		});

		var display = this.state.shown ? 'block': 'none';

		return (
			<section feed = {this.state.modalContent} className = {modalClass} style = {{display: display}}>
				Are you sure you want to subscribe to 123?
			</section>
		)
	}
});

module.exports = FeedModal;
