//Dependencies.
var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var displayTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      name: undefined,
      formatter: function(data){return data;},
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type('string'),
    value: type(['string', 'number']),
    name: type('string'),
    style: type('object')
  },
  renderValue: function renderValueDisplayText(){
      return this.props.formatter(this.props.value);
  },
  /**
   * Render a display field.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return (
      <div
        id={this.props.name}
        name={this.props.name}
        className={this.props.style.class}
      >{this.renderValue()}</div>
    );
  }
};


module.exports = builder(displayTextMixin);
