var React = require('react');

var Toast = React.createClass({

	render: function() {

		return (
			<section ref = "toastContent" className = "toast-content">
				{this.props.toast.toastContent}
			</section>
		)
	}
});

module.exports = Toast;

