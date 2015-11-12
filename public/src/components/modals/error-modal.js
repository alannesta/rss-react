var React = require('react');
var classNames = require('classnames');
var ViewActions = require('../../actions/view-actions');
var ViewStore = require('../../stores/view-store');

var ErrorModal = React.createClass({

	close: function() {
		ViewActions.closeModal();
	},

	render: function() {
		return (
			<section className = "add-feed-modal">
				<section>
					{this.props.content}
				</section>
				<section>
					<button onClick = {this.close}>Cancel</button>
				</section>
			</section>
		)
	}
});

module.exports = ErrorModal;
