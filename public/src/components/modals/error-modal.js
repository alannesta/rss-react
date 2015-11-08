var React = require('react');
var classNames = require('classnames');
var ViewActions = require('../../actions/view-actions');
var ViewStore = require('../../stores/view-store');



var ErrorModal = React.createClass({

	getInitialState: function() {
		return ViewStore.getState().modal;
	},

	modalState: function() {
		return ViewStore.getState().modal;
	},

	confirm: function() {

	},

	close: function() {
		ViewActions.closeModal();
	},

	componentDidMount: function() {
		ViewStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
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
					{this.state.modalContent}
				</section>
				<section>
					<button onClick = {this.close}>Cancel</button>
				</section>
			</section>
		)
	}
});

module.exports = ErrorModal;
