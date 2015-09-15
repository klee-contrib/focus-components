'use strict';

var React = require('react');
var builder = require('focus').component.builder;
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var panelMixin = {
  getDefaultProps: function getDefaultProps() {
    return {
      style: {}
    };
  },
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function heading() {
    if (this.props.title) {
      return React.createElement(
        'div',
        { className: 'panel-heading' },
        this.props.title
      );
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock() {
    return React.createElement(
      'div',
      { className: 'panel panel-default ' + this.props.style.className },
      this.heading(),
      React.createElement(
        'div',
        { className: 'panel-body' },
        this.props.children
      )
    );
  }
};
module.exports = builder(panelMixin);