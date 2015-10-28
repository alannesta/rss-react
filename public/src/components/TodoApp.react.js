/*
*  The 'controller-view' which is responsible for interactions with TodoStore
* */

var React = require('react');
var TodoTextInput = require('./TodoTextInput.react');
var TodoList = require('./TodoList.react');
var TodoStore = require('../stores/TodoStore');

var app = React.createClass({

    getTodoState: function() {
        return {
            allTodos: TodoStore.getAll()
        };
    },

    getInitialState: function() {
        return this.getTodoState()
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this.getTodoState());
    },

    render: function() {
        return (
            <section>
                <header>
                    <h1>todos</h1>
                    <TodoTextInput placeholder="What's up today? "/>
                </header>
                <TodoList todos = {this.state.allTodos}></TodoList>
            </section>
        )
    }
});

module.exports = app;

