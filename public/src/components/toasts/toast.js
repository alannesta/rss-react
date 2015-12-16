var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var classNames = require('classnames');

var Toast = React.createClass({

	render: function() {
		var toastContent = classNames({
			'shown': this.props.toast.toastShown,
			'toast-content': true
		});

		return (
			<section className = "toast-container">
				<ReactCSSTransitionGroup transitionName="toast" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="section">
					<section className = {toastContent}>
						{this.props.toast.toastContent}
					</section>
				</ReactCSSTransitionGroup>
			</section>
		)
	}
});

module.exports = Toast;

