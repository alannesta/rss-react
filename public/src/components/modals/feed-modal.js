var React = require('react');
var classNames = require('classnames');
var ViewActions = require('../../actions/view-actions');
var ViewStore = require('../../stores/view-store');

var FeedModal = React.createClass({

	getInitialState: function() {
		return ViewStore.getState().modal;
	},

	modalState: function() {
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

	componentDidMount: function() {
		ViewStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		console.log('unmount, remove listener');
		// this is actually never called if modal visibility is controlled by css class
		ViewStore.removeChangeListener(this._onChange);
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
