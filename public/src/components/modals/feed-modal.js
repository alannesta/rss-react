var React = require('react');
var ModalStore = require('../../stores/modal-store');
var classNames = require('classnames');
var ViewActions = require('../../actions/view-actions');

var FeedModal = React.createClass({

	getInitialState: function() {
		return ModalStore.getState();
	},

	modalState: function() {
		return ModalStore.getState();
	},

	confirm: function() {
		console.log(this.props);
		this.props.onConfirm(this.state.modalContent);
		ViewActions.closeModal();
	},

	close: function() {
		ViewActions.closeModal();
	},

	componentDidMount: function() {
		ModalStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		// this is actually never called if modal visibility is controlled by css class
		ModalStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(this.modalState());

	},

	render: function() {
		return (
			<section className = "add-feed-modal">
				<section>
					Are you sure you want to subscribe to {this.state.modalContent.name}?
				</section>
				<section>
					<button onClick = {this.confirm}>Confirm</button>
					<button onClick = {this.close}>Cancel</button>
				</section>
			</section>
		)
	}
});

module.exports = FeedModal;
