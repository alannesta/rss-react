var $ = require('jquery');
var ReactDOM = require('react-dom');

var ModalMinxin = {

	componentDidMount: function() {
		console.log(ReactDOM.findDOMNode(this));
		$('body').addClass('modal-shown');
	},

	componentWillUnmount: function() {
		console.log('mixin unmount');
	}
};

module.exports = ModalMinxin;
