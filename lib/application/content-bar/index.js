'use strict';

var builder = require('focus').component.builder;
var React = require('react');

var headerMixin = {
  /** @inheriteddoc */
  render: function renderContentBar() {
    return React.createElement(
      'div',
      { 'data-focus': 'content-bar' },
      this.props.children
    );
  }
};

module.exports = builder(headerMixin);