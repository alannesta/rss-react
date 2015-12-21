var React = require('react');

var Toast = React.createClass({

	shouldComponentUpdate: function() {
		//TODO: do not update if in animation
		return false;
	},

	componentDidMount: function() {
		var self = this;
		this.refs.toastContent.addEventListener('animationend', function(e) {
			console.log('animation end, time used: ' + e.elapsedTime);
			self.props.onAnimationEnd(self.props.toast.uid);
		})
	},

	render: function() {
		return (
			<section ref = "toastContent" className = "toast-content">
				{this.props.toast.toastContent}
			</section>
		)
	}
});

module.exports = Toast;

