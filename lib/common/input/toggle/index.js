//Target
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');

var toggleMixin = {
  mixins: [fieldGridBehaviourMixin],
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      label: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    value: type('bool'),
    label: type('string'),
    style: type('object')
  },
  getInitialState: function getInitialState() {
    return {
      isChecked: this.props.value
    };
  },
  _onChange: function onChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  _labelClassName: function labelClassName() {
    return '' + this._getContentGridClassName();
  },
  /**
   * Get the value from the input in  the DOM.
   */
  getValue: function getValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderToggle() {
    return React.createElement(
      'div',
      { className: 'togglebutton form-group' },
      React.createElement(
        'label',
        { className: this._getLabelGridClassName() },
        this.props.label ? this.props.label : ''
      ),
      React.createElement(
        'label',
        { className: this._labelClassName() },
        React.createElement('input', { ref: 'checkbox', checked: this.state.isChecked, onChange: this._onChange, type: 'checkbox' })
      )
    );
  },
  /** @inheritedDoc*/
  componentWillReceiveProps: function toggleWillreceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({ isChecked: nextProps.value });
    }
  }
};

module.exports = builder(toggleMixin);