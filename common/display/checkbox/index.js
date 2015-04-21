//Dependencies.
var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var i18nBehaviour = require('../../i18n/mixin');
/**
 * Input text mixin.
 * @type {Object}
 */
var displayCheckboxMixin = {
  mixins: [i18nBehaviour],
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type('string'),
    value: type('bool'),
    name: type('string'),
    style: type('object')
  },
  /**
   * Render the boolean value.
   */
  renderValue: function renderValueDisplayText(){
    var stringValue = this.props.value === true ? 'true' : 'false';
    return this.i18n(`display.checkbox.${stringValue}`);
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


module.exports = builder(displayCheckboxMixin);
