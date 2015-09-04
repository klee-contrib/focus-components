//Dependencies.
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var displayTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getDefaultProps() {
    return {
      formatter: function formatter(data) {
        return data;
      }
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type('string'),
    value: type(['string', 'number']),
    name: type('string'),
    style: type('object')
  },
  /**
   * Render the value.
   * @return {string} The formated value.
   */
  renderValue: function renderValue() {
    var _props = this.props;
    var formatter = _props.formatter;
    var value = _props.value;

    return formatter(value);
  },
  /** @inheritdoc */
  render: function renderInput() {
    return React.createElement(
      'div',
      this.props,
      this.renderValue()
    );
  }
};

module.exports = builder(displayTextMixin);