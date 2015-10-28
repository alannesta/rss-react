var React = require('react');
var TodoAction = require('../actions/TodoActions')

var TodoTextInput = React.createClass({

    getInitialState: function() {
      return {
          text: ''
      }
    },

    handleChange: function(e) {
        this.setState({text: e.target.value});
    },

    createTodo: function (event) {
        TodoAction.create(event.target.value);
        this.setState({text: ''});
    },

    render: function () {
        return (
            <input ref='newTodoInput' value={this.state.text} placeholder={this.props.placeholder} onChange={this.handleChange} onBlur={this.createTodo} />
        )
    }
});

module.exports = TodoTextInput;

