'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var emptyMixin = {
  render: function render() {
    return React.createElement('div', { 'data-focus': 'empty' });
  }
};

module.exports = builder(emptyMixin);