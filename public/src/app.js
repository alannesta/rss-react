var React = require('react');
var SampleComponent = require('./components/sample');
var TodoApp = TodoApp = require('./components/TodoApp.react')

React.render(
    <TodoApp />,
    document.getElementById('todoapp')
);

