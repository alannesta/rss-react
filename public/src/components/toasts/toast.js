var React = require('react');
var ReactDOM = require('react-dom');

var Toast = React.createClass({

	shouldComponentUpdate: function() {
		//TODO: do not update if in animation
		return false;
	},

	componentDidMount: function() {
		var self = this;
		var node = ReactDOM.findDOMNode(this);
		node.addEventListener('animationend', function() {
			console.log('animation end: ' + self.props.toast.uid);
			self.props.onAnimationEnd(self.props.toast.uid);
		})
	},

	componentWillUnmount: function() {
		console.log('toast unmount: ');
	},

	render: function() {
		return (
			<section className = "toast-content">
				{this.props.toast.toastContent}
			</section>
		)
	}
});

module.exports = Toast;

