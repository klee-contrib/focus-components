var builder = require('focus/component/builder');
var React = require('react');
var type = require('focus/component/types');
/**
 * Input text mixin.
 * @type {Object}
 */
var inputText = {
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: 'text',
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    type: type('string'),
    value: type(['string', 'number']),
    name: type('string'),
    style: type('object')
  },
  /**
   * Validate the input.
   * @return {object}
   */
  validate: function validateInput() {
    var value = this.getValue();
    if (value === undefined || value === "") {
      return `Le champ ${this.props.name} est requis`;
    }
    if (this.props.validator) {
      return this.props.validator(value);
    }
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render an input.
   * @return {[type]} [description]
   */
  render: function renderInput() {
    return ( < input id = {
        this.props.name
      }
      name = {
        this.props.name
      }
      value = {
        this.props.value
      }
      type = {
        this.props.type
      }
      className = {
        this.props.style.class
      }
      onChange = {
        this.props.onChange
      }
      />
    );
  }
};


module.exports = builder(inputText);
