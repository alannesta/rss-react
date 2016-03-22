var React = require('react');
var classNames = require('classnames');
var ViewActions = require('../../actions/view-actions');

var FeedModal = React.createClass({

	confirm: function() {
		this.props.onConfirm(this.props.content);
		ViewActions.closeModal();
	},

	close: function() {
		ViewActions.closeModal();
	},

	render: function() {
		return (
			<section className = "add-feed-modal">
				<section>
					Are you sure you want to subscribe to {this.props.content.name}?
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
