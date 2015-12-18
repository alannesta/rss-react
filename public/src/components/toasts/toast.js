var React = require('react');

var Toast = React.createClass({

	//shouldComponentUpdate: function() {
	//	//TODO: do not update if in animation
	//	//return false;
	//},

	render: function() {

		return (
			<section ref = "toastContent" className = "toast-content">
				{this.props.toast.toastContent}
			</section>
		)
	}
});

module.exports = Toast;

