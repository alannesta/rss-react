var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Toast = React.createClass({

	render: function() {
		return (
			<section className = "toast-container">
				<ReactCSSTransitionGroup transitionName="toast" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					<section className = "toast-content">
						{this.props.toastContent}
					</section>
				</ReactCSSTransitionGroup>
			</section>
		)
	}
});

module.exports = Toast;

