var React = require('react');
var classNames = require('classnames');
var ViewActions = require('../../actions/view-actions');
var ViewStore = require('../../stores/view-store');

var FeedModal = React.createClass({

	// should be stateless (not interacting with stores). Only controller views should subscribe to store changes
	getInitialState: function() {
		return ViewStore.getState().modal;
	},

	confirm: function() {
		console.log(this.props);
		this.props.onConfirm(this.state.modalContent);
		ViewActions.closeModal();
	},

	close: function() {
		ViewActions.closeModal();
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
