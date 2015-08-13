//Target
/*
<div class="checkbox">
  <label>
    <input type="checkbox"> Checkbox
  </label>
</div>
 */
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
/**
*
* @type {Object}
*/
var textAreaMixin = {
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      minlength: 0,
      maxlength: undefined,
      wrap: "soft",
      required: false,
      label: undefined,
      style: {},
      rows: 5,
      cols: 50
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    minlength: type('number'),
    maxlength: type('number'),
    wrap: type('string'),
    required: type('bool'),
    value: type('string'),
    label: type('string'),
    style: type('object'),
    rows: type('number'),
    cols: type('number')
  },
  /** inheritedDoc */
  getInitialState: function getTextAreaInitialState() {
    return {
      value: this.props.value
    };
  },
  /**
   * On change handler.
   * @param {object} event - Sanitize event.
   */
  _onChange: function onChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getTextAreaValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderTextArea() {
    return React.createElement(
      'textarea',
      {
        ref: 'textarea',
        onChange: this._onChange,
        cols: this.props.cols,
        rows: this.props.rows,
        minlength: this.props.minlength,
        maxlength: this.props.maxlength,
        className: this.props.style.className
      },
      this.state.value
    );
  }
};

module.exports = builder(textAreaMixin);