//Dependencies.
const builder = require('focusjs').component.builder;
const React = require('react');
const type = require('focusjs').component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
const displayTextMixin = {
  /** @inheritdoc */
  getDefaultProps(){
    return {
      formatter: (data)=> data
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
  renderValue(){
      const {formatter, value} = this.props;
      return formatter(value);
  },
   /** @inheritdoc */
  render: function renderInput() {
      return <div {...this.props}>{this.renderValue()}</div>;
  }
};


module.exports = builder(displayTextMixin);
