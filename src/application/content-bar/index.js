var builder = require('focus').component.builder;
var React = require('react');

var headerMixin = {
  /** @inheriteddoc */
  render: function renderContentBar() {
    return (
      <div data-focus='content-bar'>
        {this.props.children}
      </div>
    );
  }
};

module.exports = builder(headerMixin);
