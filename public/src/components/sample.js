/** @jsx React.DOM */
var React = require('react');
var SampleComponent = React.createClass({
  render: function() {
    return <span className="MyComponent">Hello, Continuous build!</span>;
  }
});

module.exports = SampleComponent;