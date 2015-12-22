var React = require('react');
var	ToastStore = require('../../stores/toast-store');
var Toast = require('./toast');

var ToastList = React.createClass({

	getInitialState: function() {
		return ToastStore.getState();
	},

	componentDidMount: function() {
		ToastStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ToastStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(ToastStore.getState())
	},

	render: function() {
		var toasts = [];
		var self = this;
		this.state.toasts.forEach(function(item) {
			console.log(item);
			toasts.push(<Toast key = {item.uid} onAnimationEnd= {self.props.onAnimationEnd} toast = {item}/>);
		});

		return (
			<section className = "toast-list">
				{toasts}
			</section>
		)
	}
});

module.exports = ToastList;

